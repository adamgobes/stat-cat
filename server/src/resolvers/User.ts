import { getUserId } from '../utils'
import { GQLTeam } from '../generated/gqlTypes'

export function team(parent, args, context): GQLTeam {
    const id: string = getUserId(context)

    return context.prisma.user({ id }).team()
}
