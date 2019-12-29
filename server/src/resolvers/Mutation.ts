import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { getUserId } from '../utils'
import { GQLAuthPayLoad, GQLTeam, GQLFantasyLeague, GQLUser } from '../generated/gqlTypes'

export async function register(parents, args, context, info): Promise<GQLAuthPayLoad> {
    const password = await bcrypt.hash(args.password, 10)

    const doesUserExist = await context.prisma.user({ email: args.email })

    if (doesUserExist) {
        throw new Error('A user with that email has already registered!')
    }

    const user = await context.prisma.createUser({ ...args, password })

    // initialize user's team when they create an account
    const initialTeam = {
        name: `${user.name}'s Team`,
        owner: { connect: { id: user.id } },
    }

    await context.prisma.createTeam({ ...initialTeam })

    const token: string = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    const teams = await context.prisma.teams({ where: { owner: { id: user.id } } })
    const teamIds = teams.map(team => team.id)

    return {
        token,
        teamIds,
    }
}

export async function login(parent, args, context, info): Promise<GQLAuthPayLoad> {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No user with that email was found!')
    }

    const valid: boolean = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token: string = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    const teams = await context.prisma.teams({ where: { owner: { id: user.id } } })
    const teamIds = teams.map(team => team.id)

    return {
        token,
        teamIds,
    }
}

export async function saveTeam(parent, args, context): Promise<GQLTeam> {
    const userId: string = getUserId(context)
    const team = await context.prisma.team({ id: args.teamId })

    /* In DB, Team.players is simply array of sportsFeed IDs
     * In resolvers/Team.js this array gets mapped to array of actual player objects (see schema.graphql for what that looks like)
     */
    return context.prisma.updateTeam({
        data: {
            players: { set: args.playerIds },
        },
        where: { id: team.id },
    })
}

export async function addTeam(parent, { name }, context): Promise<GQLTeam> {
    const userId: string = getUserId(context)

    const teamInfo = {
        name,
        owner: { connect: { id: userId } },
    }

    const newTeam = await context.prisma.createTeam({ ...teamInfo })
    return newTeam
}

export async function createFantasyLeague(parent, args, context): Promise<GQLFantasyLeague> {
    const userId: string = getUserId(context)

    const teamId: string = await context.prisma // get user's team based on their id
        .user({ id: userId })
        .team()
        .id()

    const createdLeague: GQLFantasyLeague = await context.prisma.createFantasyLeague({
        name: args.name,
        admin: { connect: { id: userId } },
        teams: { connect: [{ id: teamId }] },
    })

    return createdLeague
}

export async function addFantasyLeagueMember(parent, args, context): Promise<boolean> {
    const userId: string = getUserId(context)

    const leagueName: string = await context.prisma.fantasyLeague({ id: args.leagueId }).name()

    const leagueTeams: GQLTeam[] = await context.prisma.fantasyLeague({ id: args.leagueId }).teams()

    const leagueTeamsIds: string[] = leagueTeams.map(t => t.id)

    if (leagueTeamsIds.includes(args.teamId)) {
        throw new Error(`This team is already in the ${leagueName} league`)
    }

    await context.prisma.updateFantasyLeague({
        data: {
            teams: {
                connect: [{ id: args.teamId }],
            },
        },
        where: { id: args.leagueId },
    })

    return true
}

export async function removeFantasyLeagueMember(parent, args, context): Promise<boolean> {
    const userId: string = getUserId(context)

    await context.prisma.updateFantasyLeague({
        data: {
            teams: {
                disconnect: { id: args.teamId },
            },
        },
        where: { id: args.leagueId },
    })

    return true
}
