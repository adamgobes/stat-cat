export const allStats = [
    'PPG',
    'APG',
    '3PM',
    'RPG',
    'SPG',
    'BPG',
    'TPG',
    'FGA',
    'FGM',
    'FTA',
    'FTM',
]
export const timeFrames = ['All', '7d', '1m']

function computeStatProjection(stat, players) {
    return players
        .reduce((a, b) => a + b.stats.find(s => s.category === stat).value * b.gameCountThisWeek, 0)
        .toFixed(0)
}

export function computeProjections(players) {
    return allStats.map(stat => ({
        category: stat,
        value: computeStatProjection(stat, players),
    }))
}

export const computeTeamStatsAverages = players =>
    allStats.map(stat => ({
        category: stat,
        value: parseFloat(
            players.reduce((a, b) => a + b.find(s => s.category === stat).value, 0) /
                players.length,
            0
        ).toFixed(1),
    }))

export function computeBestAndAverage(players) {
    const bestAndAverage = allStats.map(stat => {
        const sorted = players.sort(
            (a, b) =>
                b.stats.find(s => s.category === stat).value -
                a.stats.find(s => s.category === stat).value
        )
        const teamAverage = parseFloat(
            players.reduce((a, b) => a + b.stats.find(s => s.category === stat).value, 0) /
                players.length
        ).toFixed(1)
        return {
            stat,
            topPerformer: {
                name: sorted[0].fullName,
                metric: sorted[0].stats.find(s => s.category === stat).value,
            },
            teamAverage,
        }
    })
    return bestAndAverage
}
