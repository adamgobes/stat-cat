export const allStats = ['RPG', 'APG', 'PPG', 'SPG', 'BPG', 'TPG']

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
