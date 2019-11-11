import { GQLStat, GQLTeam } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import { getEndDate, getStartDate, parseDate, fetchPlayerStats } from '../sportsFeed/helpers'

function calculateGameCount(teamId: string, startDate: string, endDate: string): Promise<number> {
    return sportsFeedRequest(
        `${season}/games.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
    )
        .then(json => json.games.length)
        .catch(err => 2)
}

export function stats(parent, args): Promise<GQLStat[]> {
    return fetchPlayerStats(parent.id)
}

export function gameCountThisWeek(parent, args): Promise<number> {
    const currentTeam: GQLTeam = parent.currentTeam
    return calculateGameCount(
        currentTeam.id,
        parseDate(getStartDate()),
        parseDate(getEndDate(getStartDate()))
    )
}
