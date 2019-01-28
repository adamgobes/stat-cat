const { getUserId } = require('../utils')
const { sportsFeedRequest } = require('../sportsFeed')

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
				.map(p => ({
					id: p.player.id,
					firstName: p.player.firstName,
					lastName: p.player.lastName,
					fullName: `${p.player.firstName} ${p.player.lastName}`,
					position: p.player.primaryPosition,
					currentTeam: p.player.currentTeam
						? {
								id: p.player.currentTeam.id,
								abbreviation: p.player.currentTeam.abbreviation,
						  }
						: null,
					imageSrc: p.player.officialImageSrc,
				}))
				.filter(pObj => (args.filter ? containsFilter(pObj, args.filter) : true))
		)
}

module.exports = {
	me,
	allPlayers,
}
