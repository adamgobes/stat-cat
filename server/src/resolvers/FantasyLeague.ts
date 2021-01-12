import { FantasyLeague, Team } from '@prisma/client'
import { Context } from '..'

export async function teams(parent: FantasyLeague, args, context: Context): Promise<Team[]> {
    const teams = await context.prisma.team.findMany({ where: { leagueId: parent.id } })
    return teams
}
