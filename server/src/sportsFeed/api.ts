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

const fieldGoalSelector = 'fieldGoals'
const freeThrowsSelector = 'freeThrows'
const reboundsSelector = 'rebounds'
const offenseSelector = 'offense'
const defenseSelector = 'defense'

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
        categoryName: '3PM',
        selector: json => t(json, `${fieldGoalSelector}.fg3PtMadePerGame`).safeNumber,
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
