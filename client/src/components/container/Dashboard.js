import React from 'react'
import { Box, Grid } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import Nav from '../presentational/Nav'
import TopPerformers from '../presentational/Dashboard/TopPerformers'
import ProjectionTable from '../presentational/Dashboard/ProjectionTable'
import InjuryReport from '../presentational/Dashboard/InjuryReport'
import { DASHBOARD_QUERY } from '../../apollo/queries'
import { renderWhileLoading } from '../helperComponents'

const Dashboard = ({ dashboardData }) => {
	console.log(dashboardData)
	const { myTeam } = dashboardData
	return (
		<Box>
			<Nav showMenu showSignUp={false} />
			<h1 style={{ textAlign: 'center' }}>Your Dashboard</h1>
			<Grid
				rows={['flex', 'flex']}
				columns={['flex', 'flex']}
				areas={[
					{ name: 'weeklyReport', start: [0, 0], end: [0, 0] },
					{ name: 'projections', start: [1, 0], end: [1, 0] },
					{ name: 'topPerformers', start: [0, 1], end: [1, 1] },
				]}
			>
				<Box gridArea="weeklyReport">
					<InjuryReport injuriesData={myTeam} />
				</Box>
				<Box gridArea="projections">
					<ProjectionTable projectionsData={myTeam} />
				</Box>
				<Box gridArea="topPerformers">
					<TopPerformers topPerformersData={myTeam} />
				</Box>
			</Grid>
		</Box>
	)
}

export default compose(
	graphql(DASHBOARD_QUERY, {
		name: 'dashboardData',
	}),
	renderWhileLoading('dashboardData')
)(Dashboard)
