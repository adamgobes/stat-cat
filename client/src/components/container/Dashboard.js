import React from 'react'
import { Box, Grid } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import styled from 'styled-components'

import Nav from '../presentational/Nav'
import TopPerformers from '../presentational/Dashboard/TopPerformers'
import ProjectionTable from '../presentational/Dashboard/ProjectionTable'
import InjuryReport from '../presentational/Dashboard/InjuryReport'
import { DASHBOARD_QUERY } from '../../apollo/queries'
import { renderWhileLoading } from '../helperComponents'

const DashboardComponentBox = styled(Box)`
	box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

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
				gap="small"
				areas={[
					{ name: 'weeklyReport', start: [0, 0], end: [0, 0] },
					{ name: 'projections', start: [1, 0], end: [1, 0] },
					{ name: 'topPerformers', start: [0, 1], end: [1, 1] },
				]}
			>
				<DashboardComponentBox gridArea="weeklyReport">
					<InjuryReport injuriesData={myTeam} />
				</DashboardComponentBox>
				<DashboardComponentBox gridArea="projections">
					<ProjectionTable projectionsData={myTeam} />
				</DashboardComponentBox>
				<DashboardComponentBox gridArea="topPerformers">
					<TopPerformers topPerformersData={myTeam} />
				</DashboardComponentBox>
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
