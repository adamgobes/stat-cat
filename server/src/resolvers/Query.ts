import { GQLPlayer, GQLUser, GQLTeam } from '../generated/gqlTypes'
import { sportsFeedRequest } from '../sportsFeed/api'
import { extractBasicInfo } from '../sportsFeed/helpers'
import { getUserId } from '../utils'

function containsFilter(playerObj, filter): boolean {
    return (
        playerObj.fullName.toLowerCase().startsWith(filter.toLowerCase()) ||
        playerObj.firstName.toLowerCase().startsWith(filter.toLowerCase()) ||
        playerObj.lastName.toLowerCase().startsWith(filter.toLowerCase())
    )
}

export function me(parent, args, context): GQLUser {
    const id: string = getUserId(context)

    return context.prisma.user({ id })
}

// resolver to retrieve all players from third-party SportsFeed datasource
// map through response from API, transform into object that matches schema and finally filter if there was one passed (args.filter)
export function allPlayers(parent, args): Promise<GQLPlayer[]> {
    return sportsFeedRequest('players.json')
        .then(res => res.json())
        .then(json =>
            json.players
                .map(p => extractBasicInfo(p.player))
                .filter(pObj => (args.filter ? containsFilter(pObj, args.filter) : true))
        )
}

export function myTeam(parent, args, context): GQLTeam {
    const id: string = getUserId(context)

    return context.prisma.user({ id }).team()
}
