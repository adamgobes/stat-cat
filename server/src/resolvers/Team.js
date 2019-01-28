const { getUserId } = require('../utils')

const { sportsFeedRequest } = require('../sportsFeed')

function owner(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
function players(parent) {
	return parent.players.map(playerId =>
		sportsFeedRequest(`2018-2019-regular/player_stats_totals.json?player=${playerId}`)
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
