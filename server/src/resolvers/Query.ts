import { FantasyLeague, Team, User } from '@prisma/client'
import { Context } from '..'
import {
    GQLPlayer,
    GQLUser,
    GQLTeam,
    GQLLeagueLeader,
    GQLStat,
    GQLFantasyLeague,
} from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import {
    extractBasicInfo,
    fetchPlayerStatsSeason,
    isActive,
    getPlayersStats,
} from '../sportsFeed/helpers'
import { getUserId } from '../utils'

function containsFilter(playerObj, filter: string): boolean {
    return (
        playerObj.fullName.toLowerCase().startsWith(filter.toLowerCase()) ||
        playerObj.firstName.toLowerCase().startsWith(filter.toLowerCase()) ||
        playerObj.lastName.toLowerCase().startsWith(filter.toLowerCase())
    )
}

export async function me(parent, args, context: Context): Promise<User> {
    const id: string = getUserId(context)

    const user = await context.prisma.user.findUnique({ where: { id } })
    return user
}

// resolver to retrieve all players from third-party SportsFeed datasource
// map through response from API, transform into object that matches schema and finally filter if there was one passed (args.filter)
export function allPlayers(parent, args): Promise<GQLPlayer[]> {
    return sportsFeedRequest('players.json').then(json =>
        json.players
            .filter(p => isActive(p.player))
            .map(p => extractBasicInfo(p.player))
            .filter(pObj => (args.filter ? containsFilter(pObj, args.filter) : true))
    )
}

export async function leagueLeaders(parent, args): Promise<GQLLeagueLeader[]> {
    const players = await sportsFeedRequest('players.json')

    const playersInfo: GQLPlayer[] = await Promise.all(
        players.players.map(async p => {
            return {
                ...extractBasicInfo(p.player),
                stats: await fetchPlayerStatsSeason(p.player.id),
            }
        })
    )

    return statCategories.map(c => {
        const sorted = playersInfo.sort((p1, p2) => {
            const s1 = p1.stats.find(s => s.category === c.categoryName)
            const s2 = p2.stats.find(s => s.category === c.categoryName)

            return s1.value - s2.value
        })

        const statLeaders = sorted.slice(0, 10)

        return {
            stat: c.categoryName,
            leaders: statLeaders,
        }
    })
}

export function getPlayerStats(parent, args) {
    return sportsFeedRequest(`players.json?player=${args.playerIds.join(',')}`).then(
        async ({ players }) => {
            const playerIds: string[] = players.map(({ player }) => player.id.toString())
            const stats: GQLStat[][] = await getPlayersStats(playerIds)

            return players.map(({ player }, i) => {
                return {
                    ...extractBasicInfo(player),
                    stats: stats[i],
                }
            })
        }
    )
}

export async function getTeam(parent, args, context: Context): Promise<Team> {
    const id: string = args.teamId
    const team = await context.prisma.team.findUnique({ where: { id } })
    return team
}

export function getUsers(parent, args, context: Context): User[] {
    return args.userIds.map(async id => await context.prisma.user.findUnique({ where: { id } }))
}

export async function getFantasyLeague(parent, args, context: Context): Promise<any> {
    const league = await context.prisma.team
        .findUnique({ where: { id: args.statCatTeamId } })
        .league()

    if (!league) return null

    const invitations = await context.prisma.fantasyLeagueInvitation.findMany({
        where: { leagueId: league.id },
    })
    return { ...league, invitations }
}
