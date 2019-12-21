import { getUserId } from '../utils'
import { GQLTeam } from '../generated/gqlTypes'

export function teams(parent, args, context): GQLTeam {
    const id: string = getUserId(context)

    return context.prisma.user({ id }).teams()[0]
}
