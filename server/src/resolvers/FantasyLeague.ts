import { GQLTeam } from '../generated/gqlTypes'

export function teams(parent, args, context): Promise<GQLTeam[]> {
    return context.prisma.fantasyLeague({ id: parent.id }).teams()
}
