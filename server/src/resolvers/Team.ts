import { getUserId } from '../utils'

import { sportsFeedRequest } from '../sportsFeed/api'

import { extractBasicInfo, extractInjuryInfo } from '../sportsFeed/helpers'
import { GQLTeam, GQLUser, GQLPlayer } from '../generated/gqlTypes'

export function owner(parent, args, context): GQLUser {
    return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
export function players(parent): Array<Promise<GQLPlayer>> {
    return parent.players.map(playerId =>
        sportsFeedRequest(`players.json?player=${playerId}`)
            .then(res => res.json())
            .then(json => {
                const { player } = json.players[0]

                return {
                    ...extractBasicInfo(player),
                    injury: {
                        ...extractInjuryInfo(player),
                    },
                }
            })
    )
}
