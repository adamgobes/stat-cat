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

export function fetchPlayerStats(playerId: string, timeFrame?: string): Promise<GQLStat[]> {
    const timeString = constructTimeString(timeFrame)

    if (timeString.length === 0) {
        return sportsFeedRequest(`${season}/player_stats_totals.json?player=${playerId}`).then(
            json => {
                const statsObject = json.playerStatsTotals[0]
                return statCategories.map(c => ({
                    category: c.categoryName,
                    value: c.selector(statsObject),
                }))
            }
        )
    } else {
        return sportsFeedRequest(`${season}/player_gamelogs.json?player=${playerId}&${timeString}`)
            .then(json => {
                return statCategories.map(c => ({
                    category: c.categoryName,
                    value: computeAverageFromGameLogs(json.gamelogs, c),
                }))
            })
            .catch(err => {
                return statCategories.map(c => ({
                    category: c.categoryName,
                    value: 0,
                }))
            })
    }
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
            return 'date=since-7-days-ago'
        case '1m':
            return 'date=since-30-days-ago'
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
