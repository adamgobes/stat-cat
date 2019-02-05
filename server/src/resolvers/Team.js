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
		sportsFeedRequest(`players.json?player=${playerId}`)
			.then(res => res.json())
			.then(
				json =>
					json.players.map(p => ({
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
					}))[0]
			)
	)
}

module.exports = {
	owner,
	players,
}
