const { getUserId } = require('../utils')
const { sportsFeedRequest } = require('../sportsFeed')

function me(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

// resolver to retrieve all players from third-party SportsFeed datasource
function allPlayers() {
	return sportsFeedRequest('player_stats_totals.json')
		.then(res => res.json())
		.then(json =>
			json.playerStatsTotals.map(p => ({
				id: p.player.id,
				firstName: p.player.firstName,
				lastName: p.player.lastName,
				fullName: `${p.player.firstName} ${p.player.lastName}`,
				position: p.player.primaryPosition,
			}))
		)
}

module.exports = {
	me,
	allPlayers,
}
