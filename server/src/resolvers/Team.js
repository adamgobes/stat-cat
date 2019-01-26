const base64 = require('base-64')

const { getUserId } = require('../utils')

const { sportsFeedUsername, sportsFeedPassword, sportsFeedUrl } = require('../config')

function owner(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
function players(parent) {
	const pass = base64.encode(`${sportsFeedUsername}:${sportsFeedPassword}`)
	const config = {
		headers: { Authorization: `Basic ${pass}` },
	}
	return parent.players.map(playerId =>
		fetch(`${sportsFeedUrl}/player_stats_totals.json?player=${playerId}`, config)
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
	)
}

module.exports = {
	owner,
	players,
}
