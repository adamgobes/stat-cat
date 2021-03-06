import * as moment from 'moment'

import { GQLInjury, GQLStat } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from './api'

export function extractBasicInfo(sportsFeedPlayerObj) {
    return {
        id: sportsFeedPlayerObj.id,
        firstName: sportsFeedPlayerObj.firstName,
        lastName: sportsFeedPlayerObj.lastName,
        fullName: `${sportsFeedPlayerObj.firstName} ${sportsFeedPlayerObj.lastName}`,
        position: sportsFeedPlayerObj.primaryPosition,
        currentTeam: sportsFeedPlayerObj.currentTeam
            ? {
                  id: sportsFeedPlayerObj.currentTeam.id,
                  abbreviation: sportsFeedPlayerObj.currentTeam.abbreviation,
              }
            : null,
        imageSrc: sportsFeedPlayerObj.officialImageSrc,
    }
}

export function extractInjuryInfo(sportsFeedPlayerObj): GQLInjury {
    const { playingProbability, description } = sportsFeedPlayerObj.currentInjury
    return {
        description,
        playingProbability: playingProbability.toLowerCase(),
    }
}

export function getPlayersStats(playerIds: string[], timeFrame?: string): Promise<GQLStat[][]> {
    const timeString = constructTimeString(timeFrame)

    if (timeString.length === 0) {
        return fetchPlayerStatsSeason(playerIds)
    } else {
        return fetchPlayerStatsTimeFrame(playerIds, timeFrame)
    }
}

export function fetchPlayerStatsSeason(playerIds: string[]): Promise<GQLStat[][]> {
    return sportsFeedRequest(
        `${season}/player_stats_totals.json?player=${playerIds.join(',')}`
    ).then(json => {
        return json.playerStatsTotals.map(({ player, stats }) => {
            return statCategories.map(c => ({
                category: c.categoryName,
                value: c.selector(stats),
            }))
        })
    })
}

export async function fetchPlayerStatsTimeFrame(
    playerIds: string[],
    timeFrame: string
): Promise<GQLStat[][]> {
    const timeString = constructTimeString(timeFrame)

    return sportsFeedRequest(
        `${season}/player_gamelogs.json?player=${playerIds.join(',')}&${timeString}`
    ).then(json => {
        return playerIds.map(id => {
            const playerGameLogs = json.gamelogs.filter(
                gamelog => gamelog.player.id.toString() === id
            )

            return statCategories.map(c => ({
                category: c.categoryName,
                value: computeAverageFromGameLogs(playerGameLogs, c),
            }))
        })
    })
}

export function computeAverageFromGameLogs(gamelogs, category): number {
    if (gamelogs.length === 0) {
        return 0
    }

    const total = gamelogs.reduce((sum, gamelog) => {
        return sum + category.selector(gamelog.stats)
    }, 0)
    return parseFloat((total / gamelogs.length).toFixed(1))
}

export function constructTimeString(timeFrame: string): string {
    switch (timeFrame) {
        case TIME_FRAMES.WEEK:
            return `date=since-7-days-ago`
        case TIME_FRAMES.MONTH:
            return `date=since-30-days-ago`
        default:
            return ''
    }
}

export function isActive(player): boolean {
    return (
        player.currentRosterStatus === 'ROSTER' ||
        player.currentRosterStatus === 'ASSIGNED_TO_MINORS'
    )
}

export function parseDate(date: moment.Moment): string {
    return moment(date).format('YYYYMMDD')
}

export function getFirstDayOfWeek(): moment.Moment {
    return moment().startOf('isoWeek')
}

export function getLastDayOfWeek(startDate: moment.Moment): moment.Moment {
    return moment(startDate).add(6, 'days')
}

export const TIME_FRAMES = {
    ALL: 'All',
    WEEK: '7d',
    MONTH: '1m',
}
