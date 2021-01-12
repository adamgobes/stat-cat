import { getUserId } from '../utils'
import { GQLTeam } from '../generated/gqlTypes'
import { Context } from '..'
import { Team } from '@prisma/client'

export async function teams(parent, args, context: Context): Promise<Team[]> {
    const id: string = getUserId(context)

    const teams = await context.prisma.team.findMany({ where: { ownerId: id } })
    return teams
}
