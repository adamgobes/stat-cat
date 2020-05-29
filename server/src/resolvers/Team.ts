import { sportsFeedRequest } from '../sportsFeed/api'

import { extractBasicInfo, extractInjuryInfo, getPlayersStats } from '../sportsFeed/helpers'
import { GQLUser, GQLPlayer, GQLStat, GQLFantasyLeague } from '../generated/gqlTypes'

export function owner(parent, args, context): GQLUser {
    return context.prisma.team({ id: parent.id }).owner()
}

// in DB players are stored as IDs, this resolver turns those IDs into actual player objects
// resolves User.team.players
export function players(parent, { timeFrame }): Promise<GQLPlayer[]> {
    if (parent.players.length === 0) {
        return new Promise((resolve, reject) => resolve([]))
    }

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

export function league(parent, args, context): Promise<GQLFantasyLeague> {
    return context.prisma.team({ id: parent.id }).league()
}
