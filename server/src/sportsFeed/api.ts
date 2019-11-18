import * as base64 from 'base-64'
import t from 'typy'

export const season: string = '2019-2020-regular'

export function sportsFeedRequest(path: string): Promise<any> {
    const pass = base64.encode(
        `${process.env.sportsFeedUsername}:${process.env.sportsFeedPassword}`
    )
    const config = {
        headers: { Authorization: `Basic ${pass}` },
    }
    return fetch(`${process.env.sportsFeedUrl}/${path}`, config).then(res => res.json())
}

const fieldGoalSelector = 'stats.fieldGoals'
const freeThrowsSelector = 'stats.freeThrows'
const reboundsSelector = 'stats.rebounds'
const offenseSelector = 'stats.offense'
const defenseSelector = 'stats.defense'

export const statCategories = [
    {
        categoryName: 'FGA',
        selector: json => t(json, `${fieldGoalSelector}.fgAttPerGame`).safeNumber,
    },
    {
        categoryName: 'FGM',
        selector: json => t(json, `${fieldGoalSelector}.fgMadePerGame`).safeNumber,
    },
    {
        categoryName: 'FTA',
        selector: json => t(json, `${freeThrowsSelector}.ftAttPerGame`).safeNumber,
    },
    {
        categoryName: 'FTM',
        selector: json => t(json, `${freeThrowsSelector}.ftMadePerGame`).safeNumber,
    },
    {
        categoryName: 'RPG',
        selector: json => t(json, `${reboundsSelector}.rebPerGame`).safeNumber,
    },
    {
        categoryName: 'APG',
        selector: json => t(json, `${offenseSelector}.astPerGame`).safeNumber,
    },
    {
        categoryName: 'PPG',
        selector: json => t(json, `${offenseSelector}.ptsPerGame`).safeNumber,
    },
    {
        categoryName: 'SPG',
        selector: json => t(json, `${defenseSelector}.stlPerGame`).safeNumber,
    },
    {
        categoryName: 'BPG',
        selector: json => t(json, `${defenseSelector}.blkPerGame`).safeNumber,
    },
    {
        categoryName: 'TPG',
        selector: json => t(json, `${defenseSelector}.tovPerGame`).safeNumber,
    },
]
