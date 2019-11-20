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

export function fetchPlayerStatsSeason(playerId: string): Promise<GQLStat[]> {
    return sportsFeedRequest(`${season}/player_stats_totals.json?player=${playerId}`).then(json => {
        const statsObject = json.playerStatsTotals[0]
        return statCategories.map(c => ({
            category: c.categoryName,
            value: c.selector(statsObject),
        }))
    })
}

export async function fetchPlayerStatsTimeFrame(
    playerId: string,
    timeFrame: string
): Promise<GQLStat[]> {
    const timeString = constructTimeString(timeFrame)

    if (timeString.length === 0) {
        return fetchPlayerStatsSeason(playerId)
    }

    const oldStats = await sportsFeedRequest(
        `${season}/player_stats_totals.json?player=${playerId}&${timeString}`
    )

    const oldStatsObject = oldStats.playerStatsTotals[0]

    const currentStats = await sportsFeedRequest(
        `${season}/player_stats_totals.json?player=${playerId}`
    )

    const currentStatsObject = currentStats.playerStatsTotals[0]

    return statCategories.map(c => {
        const oldGamesPlayed = oldStatsObject.stats.gamesPlayed
        const currentGamesPlayed = currentStatsObject.stats.gamesPlayed

        return {
            category: c.categoryName,
            value: parseFloat(
                (
                    (c.selector(currentStatsObject) * currentGamesPlayed -
                        c.selector(oldStatsObject) * oldGamesPlayed) /
                    (currentGamesPlayed - oldGamesPlayed)
                ).toFixed(2)
            ),
        }
    })
}

export function computeAverageFromGameLogs(gamelogs, category): number {
    const total = gamelogs.reduce((sum, gamelog) => {
        return sum + category.selector(gamelog)
    }, 0)
    return parseFloat((total / gamelogs.length).toFixed(1))
}

export function constructTimeString(timeFrame: string): string {
    switch (timeFrame) {
        case '7d':
            const lastWeekDate = moment()
                .subtract(8, 'days')
                .format('YYYYMMDD')
            return `date=${lastWeekDate}`
        case '1m':
            const lastMonthDate = moment().subtract(1, 'months')

            if (lastMonthDate.isBefore(moment('2019-10-22'))) {
                return ''
            }
            return `date=${lastMonthDate}`
        default:
            return ''
    }
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

export function isActive(player): boolean {
    return player.currentRosterStatus === 'ROSTER'
}
