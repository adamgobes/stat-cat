import { getUserId } from '../utils'

import { sportsFeedRequest, season } from '../sportsFeed/api'

import { extractBasicInfo, extractInjuryInfo, extractStats } from '../sportsFeed/helpers'
import { GQLTeam, GQLUser, GQLPlayer } from '../generated/gqlTypes'

export function owner(parent, args, context): GQLUser {
    return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
export function players(parent): Promise<GQLPlayer[]> {
    return sportsFeedRequest(
        `${season}/player_stats_totals.json?player=${parent.players.join(',')}`
    ).then(json => {
        return json.playerStatsTotals.map(({ player, stats }) => {
            return {
                ...extractBasicInfo(player),
                injury: player.currentInjury
                    ? {
                          ...extractInjuryInfo(player),
                      }
                    : null,
                stats: extractStats(stats),
            }
        })
    })
}
