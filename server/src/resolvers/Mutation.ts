import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

import { getUserId } from '../utils'
import {
    GQLAuthPayLoad,
    GQLTeam,
    GQLFantasyLeague,
    GQLCreateLeagueResponse,
    GQLLeagueMemberEntry,
} from '../generated/gqlTypes'
import { getLeagueInformation, getESPNTeamPlayers } from '../scraper'
import { playerNamesToIds } from '../sportsFeed/api'
import { Context } from '..'
import { FantasyLeague, Team } from '@prisma/client'

export async function register(parent, args, context: Context): Promise<GQLAuthPayLoad> {
    const password = await bcrypt.hash(args.password, 10)

    const doesUserExist = await context.prisma.user.findUnique({ where: { email: args.email } })

    if (doesUserExist) {
        throw new Error('A user with that email has already registered!')
    }

    const user = await context.prisma.user.create({ data: { ...args, password } })

    // initialize user's team when they create an account
    const initialTeam = {
        name: `${user.name}'s Team`,
        owner: { connect: { id: user.id } },
    }

    await context.prisma.team.create({ data: { ...initialTeam } })

    const token: string = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    const teams = await context.prisma.team.findMany({ where: { ownerId: user.id } })
    const teamIds = teams.map(team => team.id)

    return {
        token,
        teamIds,
    }
}

export async function login(parent, args, context: Context): Promise<GQLAuthPayLoad> {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
        throw new Error('No user with that email was found!')
    }

    const valid: boolean = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token: string = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    const teams = await context.prisma.team.findMany({ where: { ownerId: user.id } })
    const teamIds = teams.map(team => team.id)

    return {
        token,
        teamIds,
    }
}

export async function saveTeam(parent, args, context: Context): Promise<Team> {
    const userId: string = getUserId(context)
    const team = await context.prisma.team.findUnique({ where: { id: args.teamId } })

    /* In DB, Team.players is simply array of sportsFeed IDs
     * In resolvers/Team.js this array gets mapped to array of actual player objects (see schema.graphql for what that looks like)
     */
    return context.prisma.team.update({
        data: {
            players: { set: args.playerIds },
        },
        where: { id: team.id },
    })
}

export async function addTeam(parent, args, context: Context): Promise<Team> {
    const userId: string = getUserId(context)

    const teamInfo = {
        name: args.name,
        owner: { connect: { id: userId } },
    }

    const newTeam = await context.prisma.team.create({ data: { ...teamInfo } })
    return newTeam
}

export async function createFantasyLeague(
    parent,
    args,
    context: Context
): Promise<GQLCreateLeagueResponse> {
    const userId: string = getUserId(context)

    let leagueName: string
    let leagueMembers: string[]

    try {
        ;({ leagueName, leagueMembers } = await getLeagueInformation(args.leagueId))
    } catch (e) {
        console.log({ e })
        throw new Error('Error fetching fantasy league information')
    }

    const formattedLeagueMembers: GQLLeagueMemberEntry[] = leagueMembers.map(
        (teamName, teamIndex) => ({
            teamId: teamIndex + 1,
            teamName,
        })
    )

    // check if league already exists
    const league = await context.prisma.fantasyLeague.findUnique({
        where: { espnId: args.leagueId },
    })
    if (!!league) {
        return {
            leagueName: league.name,
            leagueMembers: formattedLeagueMembers,
            espnId: league.espnId,
        }
    }

    // if it doesn't, go ahead and create a new one
    const createdLeague: FantasyLeague = await context.prisma.fantasyLeague.create({
        data: { name: leagueName, espnId: args.leagueId },
    })

    return {
        leagueName: createdLeague.name,
        leagueMembers: formattedLeagueMembers,
        espnId: createdLeague.espnId,
    }
}

export async function addFantasyLeagueMember(parent, args, context: Context): Promise<boolean> {
    const userId: string = getUserId(context)

    const league: FantasyLeague = await context.prisma.fantasyLeague.findUnique({
        where: { espnId: args.leagueId },
    })

    const leagueName: string = league.name

    const leagueTeams: Team[] = await context.prisma.team.findMany({
        where: { espnId: league.espnId },
    })

    const espnIds = leagueTeams.map(team => team.espnId)

    if (espnIds.includes(args.espnTeamId)) {
        throw new Error(`Oops! Someone in your league has already connected to that team!`)
    }

    const { espnTeamName, playerNames } = await getESPNTeamPlayers(args.leagueId, args.espnTeamId)

    const playerIds = await playerNamesToIds(playerNames)

    await context.prisma.team.update({
        data: {
            league: { connect: { id: league.id } },
            espnId: args.espnTeamId,
            players: { set: playerIds },
            name: espnTeamName,
        },
        where: { id: args.statCatTeamId },
    })

    return true
}

export async function removeFantasyLeagueMember(parent, args, context: Context): Promise<boolean> {
    const userId: string = getUserId(context)

    await context.prisma.team.update({
        data: {
            league: { disconnect: true },
            espnId: null,
        },
        where: { id: args.statCatTeamId },
    })

    return true
}

export async function syncTeam(parent, args, context: Context): Promise<boolean> {
    const userId: string = getUserId(context)

    const league: FantasyLeague = await context.prisma.team
        .findUnique({ where: { id: args.statCatTeamId } })
        .league()

    const { espnTeamName, playerNames } = await getESPNTeamPlayers(league.espnId, args.espnTeamId)

    const playerIds: string[] = await playerNamesToIds(playerNames)

    await context.prisma.team.update({
        data: {
            name: espnTeamName,
            players: { set: playerIds },
        },
        where: { id: args.statCatTeamId },
    })

    return true
}
