const base64 = require('base-64')

const { getUserId } = require('../utils')
const { sportsFeedUsername, sportsFeedPassword, sportsFeedUrl } = require('../config')

function allUsers(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.users()
}

function me(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

function player(parent, args, context) {
	const pass = base64.encode(`${sportsFeedUsername}:${sportsFeedPassword}`)
	const config = {
		headers: { Authorization: `Basic ${pass}` },
	}
	return fetch(`${sportsFeedUrl}/player_stats_totals.json?player=${args.id}`, config)
		.then(res => res.json())
		.then(json => ({
			id: json.playerStatsTotals[0].player.id,
			firstName: json.playerStatsTotals[0].player.firstName,
			lastName: json.playerStatsTotals[0].player.lastName,
			fullName: `${json.playerStatsTotals[0].player.firstName} ${
				json.playerStatsTotals[0].player.lastName
			}`,
			position: json.playerStatsTotals[0].player.primaryPosition,
		}))
}

module.exports = {
	allUsers,
	me,
	player,
}
