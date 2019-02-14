import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Bar } from 'react-chartjs-2'
import { USER_TEAM_QUERY } from '../../../apollo/queries'

const allStats = ['RPG', 'APG', 'PPG', 'SPG', 'BPG', 'TPG']

const TopPerformers = ({ data: { userTeam } }) => {
	const bestAndAverage = allStats.map(stat => {
		const sorted = userTeam.sort(
			(a, b) =>
				b.stats.find(s => s.category === stat).value -
				a.stats.find(s => s.category === stat).value
		)
		const teamAverage = parseFloat(
			userTeam.reduce((a, b) => a + b.stats.find(s => s.category === stat).value, 0) /
				userTeam.length
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

	const options = {
		maintainAspectRatio: true,
		responsive: true,
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	}

	const data = {
		labels: allStats,
		datasets: [
			{
				label: 'Best',
				data: bestAndAverage.map(statCategory => statCategory.topPerformer.metric),
				backgroundColor: 'rgb(54,162,235, 0.7)',
			},
			{
				label: 'Team Average',
				data: bestAndAverage.map(statCategory => statCategory.teamAverage),
				backgroundColor: 'rgb(255,99,132, 0.7)',
			},
		],
	}

	console.log(data)

	return (
		<Box style={{ width: '600px' }}>
			<h4>Top Performers</h4>
			<Bar data={data} options={options} />
		</Box>
	)
}

export default compose(graphql(USER_TEAM_QUERY))(TopPerformers)
