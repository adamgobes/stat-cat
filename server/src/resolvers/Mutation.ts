import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { APP_SECRET } from '../config'
import { getUserId } from '../utils'
import { GQLAuthPayLoad, GQLTeam, GQLFantasyLeague } from '../generated/gqlTypes'

export async function register(parents, args, context, info): Promise<GQLAuthPayLoad> {
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

export async function login(parent, args, context, info): Promise<GQLAuthPayLoad> {
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

export async function saveTeam(parent, args, context): Promise<GQLTeam> {
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

export async function createFantasyLeague(parent, args, context): Promise<boolean> {
    const userId: string = getUserId(context)
    const teamId: string = await context.prisma // get user's team based on their id
        .user({ id: userId })
        .team()
        .id()

    const createdLeague = await context.prisma.createFantasyLeague({
        name: args.name,
        admin: { connect: { id: userId } },
        members: { connect: [{ id: teamId }] },
    })

    return true
}

export async function addLeagueMember(parent, args, context): Promise<boolean> {
    const userId: string = getUserId(context)
    const leagueMembers = await context.prisma.fantasyLeague({ id: args.leagueId }).members()

    await context.prisma.updateFantasyLeague({
        data: {
            members: {
                connect: [
                    ...leagueMembers.map(id => {
                        id
                    }),
                    { id: args.teamId },
                ],
            },
        },
        where: { id: args.leagueId },
    })

    return true
}
