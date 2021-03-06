import * as base64 from 'base-64'
import t from 'typy'
import fetch from 'node-fetch'

export const season: string = '2020-2021-regular'

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

const formatName = (name: string): string => {
    const firstName = name.substring(0, name.indexOf(' '))

    const lastName = name.substring(firstName.length + 1)

    const formattedFirstName = firstName.replace(/[^a-zA-Z]/g, '')
    const formattedLastName = lastName.replace(/[^a-zA-Z]/g, '')

    return `${formattedFirstName}-${formattedLastName}`
}

export function playerNamesToIds(playerNames: string[]): Promise<string[]> {
    return sportsFeedRequest(
        `players.json?player=${playerNames.map(name => formatName(name)).join(',')}`
    ).then(({ players }) => players.map(({ player }) => player.id.toString()))
}
