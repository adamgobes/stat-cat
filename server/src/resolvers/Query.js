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

	let resolvedPlayers = playersResolver({
		players: userPlayers,
	})

	resolvedPlayers = await Promise.all(resolvedPlayers)

	const projectedStats = {}

	const teamToGameCount = {}

	const teamIds = []
	const computed = []

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

	const teamCounts = await Promise.all(teamCountPromises)

	teamCounts.forEach((count, i) => {
		teamToGameCount[teamIds[i]] = count
	})

	const playerStatPromises = resolvedPlayers.map(player => statsResolver({ id: player.id }))

	const allPlayerStats = await Promise.all(playerStatPromises)

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
