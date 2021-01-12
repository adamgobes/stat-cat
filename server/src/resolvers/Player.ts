import { GQLNbaTeam, GQLStat, GQLTeam } from '../generated/gqlTypes'
import { sportsFeedRequest, season, statCategories } from '../sportsFeed/api'
import { getLastDayOfWeek, getFirstDayOfWeek, parseDate } from '../sportsFeed/helpers'

interface Parent {
    currentTeam: GQLNbaTeam
}

function calculateGameCount(teamId: string, startDate: string, endDate: string): Promise<number> {
    return sportsFeedRequest(
        `${season}/games.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
    )
        .then(json => json.games.length)
        .catch(err => 4)
}

export function gameCountThisWeek(parent: Parent, args): Promise<number> {
    const currentTeam: GQLNbaTeam = parent.currentTeam
    const firstDayOfWeek = getFirstDayOfWeek()
    return calculateGameCount(
        currentTeam.id,
        parseDate(firstDayOfWeek),
        parseDate(getLastDayOfWeek(firstDayOfWeek))
    )
}
