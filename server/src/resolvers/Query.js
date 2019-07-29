const { getUserId } = require('../utils')
const { sportsFeedRequest } = require('../sportsFeed/api')
const { extractBasicInfo } = require('../sportsFeed/helpers')

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

module.exports = {
    me,
    myTeam,
    allPlayers,
}
