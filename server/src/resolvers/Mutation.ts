const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

import { APP_SECRET } from '../utils'
import { getUserId } from '../utils'
import { GQLAuthPayLoad, GQLUser } from '../generated/gqlTypes'

export async function register(parents, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.createUser({ ...args, password })

    // initialize user's team when they create an account
    const initialTeam = {
        name: `${user.name}'s Team`,
        owner: { connect: { id: user.id } },
    }

    await context.prisma.createTeam({ ...initialTeam })

    const token: string = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

export async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid: boolean = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token: string = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

export async function saveTeam(parent, args, context) {
    const userId: string = getUserId(context)
    const teamId: string = await context.prisma // get user's team based on their id
        .user({ id: userId })
        .team()
        .id()

    /* In DB, Team.players is simply array of sportsFeed IDs
     * In resolvers/Team.js this array gets mapped to array of actual player objects (see schema.graphql for what that looks like)
     */
    return context.prisma.updateTeam({
        data: {
            players: { set: args.playerIds },
        },
        where: { id: teamId },
    })
}
