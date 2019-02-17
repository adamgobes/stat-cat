import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'

import Nav from '../presentational/Nav'
import TopPerformers from '../presentational/Dashboard/TopPerformers'
import ProjectionTable from '../presentational/Dashboard/ProjectionTable'
import InjuryReport from '../presentational/Dashboard/InjuryReport'
import { DASHBOARD_QUERY } from '../../apollo/queries';

const Dashboard = ({ dashboardData }) => {
	console.log(dashboardData)
	const { myTeam } = dashboardData
	return (
		<Box>
			<Nav showMenu showSignUp={false} />
			<h1 style={{ textAlign: 'center' }}>Your Dashboard</h1>
			<TopPerformers topPerformersData={myTeam} />
			<ProjectionTable projectionsData={myTeam} />
			<InjuryReport injuriesData={myTeam} />
		</Box>
	)
}

export default compose(
	graphql(DASHBOARD_QUERY, {
		name: 'dashboardData',
	}),
	branch(props => props.dashboardData.loading, renderComponent(() => <div>loading</div>))
)(Dashboard)
