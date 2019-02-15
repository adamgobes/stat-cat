const { getUserId } = require('../utils')
const { sportsFeedRequest, extractBasicInfo } = require('../sportsFeed')
const { players: playersResolver } = require('./Team')
const { stats: statsResolver } = require('./Player')

function containsFilter(playerObj, filter) {
	return (
		playerObj.fullName.toLowerCase().startsWith(filter.toLowerCase()) ||
		playerObj.firstName.toLowerCase().startsWith(filter.toLowerCase()) ||
		playerObj.lastName.toLowerCase().startsWith(filter.toLowerCase())
	)
}

function me(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

// resolver to retrieve all players from third-party SportsFeed datasource
// map through response from API, transform into object that matches schema and finally filter if there was one passed (args.filter)
function allPlayers(parent, args) {
	return sportsFeedRequest('players.json')
		.then(res => res.json())
		.then(json =>
			json.players
				.map(p => extractBasicInfo(p.player))
				.filter(pObj => (args.filter ? containsFilter(pObj, args.filter) : true))
		)
}

function myTeam(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id }).team()
}

function calculateGameCount(teamId, startDate, endDate) {
	return sportsFeedRequest(
		`2018-2019-regular/team_gamelogs.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
	)
		.then(res => res.json())
		.then(json => json.gamelogs.length)
}

function roundAndParse(float) {
	return parseFloat(float.toFixed(1))
}

async function projections(parent, args, context) {
	const { userId, startDate, endDate } = args

	const userPlayers = await context.prisma
		.user({ id: userId })
		.team()
		.players()

	// array of promises
	let resolvedPlayers = playersResolver({
		players: userPlayers,
	})

	// wait for all those promises to resolve
	resolvedPlayers = await Promise.all(resolvedPlayers)

	const projectedStats = {}

	const teamToGameCount = {}

	const teamIds = [] // keep track of all teamIds (used for lookup later)
	const computed = [] // keep track of which teams we've computed how many times they play (avoid duplicate network requests)

	// array of team count promises
	const teamCountPromises = resolvedPlayers.map(player => {
		const playerTeam = player.currentTeam.id
		const previouslyComputed = computed.includes(playerTeam)
		if (previouslyComputed) {
			teamIds.push(playerTeam)
			return null
		}

		const count = calculateGameCount(playerTeam, startDate, endDate)

		computed.push(playerTeam)
		teamIds.push(playerTeam)

		return count
	})

	// wait for all those promises to resolve
	const teamCounts = await Promise.all(teamCountPromises)

	// create teamToGameCount map using teamIds to index
	teamCounts.forEach((count, i) => {
		teamToGameCount[teamIds[i]] = count
	})

	// array of stat promises
	const playerStatPromises = resolvedPlayers.map(player => statsResolver({ id: player.id }))

	// wait for all those promises to resolve
	const allPlayerStats = await Promise.all(playerStatPromises)

	// iterate through each player and each of their stats, computing their projected stats using (number of times they play * stat average)
	resolvedPlayers.forEach((player, i) => {
		const playerStats = allPlayerStats[i]
		playerStats.forEach(stat => {
			if (
				stat.category !== 'FGA' &&
				stat.category !== 'FGM' &&
				stat.category !== 'FTA' &&
				stat.category !== 'FTM'
			) {
				if (stat.category in projectedStats) {
					projectedStats[stat.category] = roundAndParse(
						projectedStats[stat.category] +
							roundAndParse(stat.value * teamToGameCount[player.currentTeam.id])
					)
				} else {
					projectedStats[stat.category] = roundAndParse(
						stat.value * teamToGameCount[player.currentTeam.id]
					)
				}
			}
		})
	})

	return Object.keys(projectedStats).map(stat => ({
		category: stat,
		value: projectedStats[stat],
	}))
}

module.exports = {
	me,
	myTeam,
	allPlayers,
	projections,
}
