const { getUserId } = require('../utils')

const { sportsFeedRequest } = require('../sportsFeed/api')

const { extractBasicInfo, extractInjuryInfo } = require('../sportsFeed/helpers')

function owner(parent, args, context) {
    const id = getUserId(context)

    return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
function players(parent, args) {
    return parent.players.map(playerId =>
        sportsFeedRequest(`players.json?player=${playerId}`)
            .then(res => res.json())
            .then(json => {
                const { player } = json.players[0]

                return {
                    ...extractBasicInfo(player),
                    ...extractInjuryInfo(player),
                }
            })
    )
}

module.exports = {
    owner,
    players,
}
