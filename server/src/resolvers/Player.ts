import { GQLStat, GQLTeam } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import {
    getLastDayOfWeek,
    getFirstDayOfWeek,
    parseDate,
    fetchPlayerStats,
} from '../sportsFeed/helpers'

function calculateGameCount(teamId: string, startDate: string, endDate: string): Promise<number> {
    return sportsFeedRequest(
        `${season}/games.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
    )
        .then(json => json.games.length)
        .catch(err => 4)
}

export function stats(parent, args): Promise<GQLStat[]> {
    return fetchPlayerStats(parent.id, args.timeString)
}

export function gameCountThisWeek(parent, args): Promise<number> {
    const currentTeam: GQLTeam = parent.currentTeam
    const firstDayOfWeek = getFirstDayOfWeek()
    return calculateGameCount(
        currentTeam.id,
        parseDate(firstDayOfWeek),
        parseDate(getLastDayOfWeek(firstDayOfWeek))
    )
}
