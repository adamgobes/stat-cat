const { sportsFeedRequest } = require('../sportsFeed/api')
const { getStartDate, getEndDate, parseDate } = require('../sportsFeed/helpers')

function fetchPlayerStats(playerId) {
	return sportsFeedRequest(`2018-2019-regular/player_stats_totals.json?player=${playerId}`)
		.then(res => res.json())
		.then(json => {
			const fieldGoalObj = json.playerStatsTotals[0].stats.fieldGoals
			const freeThrowsObj = json.playerStatsTotals[0].stats.freeThrows
			const reboundsObj = json.playerStatsTotals[0].stats.rebounds
			const offenseObj = json.playerStatsTotals[0].stats.offense
			const defenseObj = json.playerStatsTotals[0].stats.defense
			return [
				{
					category: 'FGA',
					value: fieldGoalObj.fg2PtAttPerGame,
				},
				{
					category: 'FGM',
					value: fieldGoalObj.fg2PtMadePerGame,
				},
				{
					category: 'FTA',
					value: freeThrowsObj.ftAttPerGame,
				},
				{
					category: 'FTM',
					value: freeThrowsObj.ftMadePerGame,
				},
				{
					category: 'RPG',
					value: reboundsObj.rebPerGame,
				},
				{
					category: 'APG',
					value: offenseObj.astPerGame,
				},
				{
					category: 'PPG',
					value: offenseObj.ptsPerGame,
				},
				{
					category: 'SPG',
					value: defenseObj.stlPerGame,
				},
				{
					category: 'BPG',
					value: defenseObj.blkPerGame,
				},
				{
					category: 'TPG',
					value: defenseObj.tovPerGame,
				},
			]
		})
}

function calculateGameCount(teamId, startDate, endDate) {
	return sportsFeedRequest(
		`2018-2019-regular/team_gamelogs.json?team=${teamId}&date=from-${startDate}-to-${endDate}`
	)
		.then(res => res.json())
		.then(json => json.gamelogs.length)
}

function stats(parent, args) {
	return fetchPlayerStats(parent.id)
}

function gameCountThisWeek(parent, args) {
	return calculateGameCount(
		parent.currentTeam.id,
		parseDate(getStartDate()),
		parseDate(getEndDate(getStartDate()))
	)
}

module.exports = {
	stats,
	gameCountThisWeek,
}
