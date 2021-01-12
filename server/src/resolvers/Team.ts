import { sportsFeedRequest } from '../sportsFeed/api'

import { extractBasicInfo, extractInjuryInfo, getPlayersStats } from '../sportsFeed/helpers'
import { GQLUser, GQLPlayer, GQLStat, GQLFantasyLeague } from '../generated/gqlTypes'
import { Context } from '..'
import { FantasyLeague, User } from '@prisma/client'

export async function owner(parent, args, context: Context): Promise<User> {
    const owner = await context.prisma.team.findUnique({ where: { id: parent.id } }).owner()
    return owner
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

export async function league(parent, args, context: Context): Promise<FantasyLeague> {
    const league = await context.prisma.team.findUnique({ where: { id: parent.id } }).league()
    return league
}
