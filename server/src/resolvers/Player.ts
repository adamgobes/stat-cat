import { GQLStat, GQLTeam } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import {
    getLastDayOfWeek,
    getFirstDayOfWeek,
    parseDate,
    fetchPlayerStatsSeason,
    fetchPlayerStatsTimeFrame,
    TIME_FRAMES,
} from '../sportsFeed/helpers'

function calculateGameCount(teamId: string, startDate: string, endDate: string): Promise<number> {
    return sportsFeedRequest(
        `${season}/games.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
    )
        .then(json => json.games.length)
        .catch(err => 4)
}

export async function stats(parent, args, context): Promise<GQLStat[]> {
    if (args.timeFrame && args.timeFrame !== TIME_FRAMES.ALL) {
        return fetchPlayerStatsTimeFrame(parent.id, args.timeFrame)
    }
    return fetchPlayerStatsSeason(parent.id)
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
