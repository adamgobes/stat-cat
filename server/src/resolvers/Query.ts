import { GQLPlayer, GQLUser, GQLTeam, GQLLeagueLeader } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import { extractBasicInfo } from '../sportsFeed/helpers'
import { getUserId } from '../utils'

function containsFilter(playerObj, filter: string): boolean {
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
    return sportsFeedRequest('players.json').then(json =>
        json.players
            .map(p => extractBasicInfo(p.player))
            .filter(pObj => (args.filter ? containsFilter(pObj, args.filter) : true))
    )
}

export function myTeam(parent, args, context): GQLTeam {
    const id: string = getUserId(context)

    return context.prisma.user({ id }).team()
}

export async function leagueLeaders(parent, args): Promise<any[]> {
    const allPlayers = await sportsFeedRequest('players.json')

    const allPlayersIds = allPlayers.players.map(p => {
        return p.player.id
    })

    console.log(allPlayersIds)

    return [
        {
            stat: {
                category: 'FGA',
                value: 100,
            },
            leader: {
                firstName: 'lebron',
                lastName: 'james',
            },
        },
    ]
}
