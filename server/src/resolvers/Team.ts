import { sportsFeedRequest } from '../sportsFeed/api'

import { extractBasicInfo, extractInjuryInfo, getPlayersStats } from '../sportsFeed/helpers'
import { GQLUser, GQLPlayer, GQLStat } from '../generated/gqlTypes'

export function owner(parent, args, context): GQLUser {
    return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
export function players(parent, { timeFrame }): Promise<GQLPlayer[]> {
    return sportsFeedRequest(`players.json?player=${parent.players.join(',')}`).then(
        async ({ players: teamPlayers }) => {
            const playerIds: string[] = teamPlayers.map(({ player }) => player.id.toString())
            const stats: GQLStat[][] = await getPlayersStats(playerIds, timeFrame)

            return teamPlayers.map(({ player }, i) => {
                return {
                    ...extractBasicInfo(player),
                    injury: player.currentInjury
                        ? {
                              ...extractInjuryInfo(player),
                          }
                        : null,
                    stats: stats[i],
                }
            })
        }
    )
}
