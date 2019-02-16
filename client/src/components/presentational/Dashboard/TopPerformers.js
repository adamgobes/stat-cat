import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { Bar } from 'react-chartjs-2'

import { USER_TEAM_QUERY } from '../../../apollo/queries'
import { allStats, computeBestAndAverage } from '../../../utils/computeHelpers'

const TopPerformers = ({ data: { userTeam } }) => {
	const bestAndAverage = computeBestAndAverage(userTeam)

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

	return (
		<Box style={{ width: '600px' }}>
			<h4>Top Performers</h4>
			<Bar data={data} options={options} />
		</Box>
	)
}

export default compose(graphql(USER_TEAM_QUERY))(TopPerformers)
