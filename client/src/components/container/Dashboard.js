import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import Nav from '../presentational/Nav'
import TopPerformers from '../presentational/Dashboard/TopPerformers'
import ProjectionTable from '../presentational/Dashboard/ProjectionTable'
import InjuryReport from '../presentational/Dashboard/InjuryReport'

const Dashboard = () => {
	return (
		<Box>
			<Nav showMenu showSignUp={false} />
			<h1 style={{ textAlign: 'center' }}>Your Dashboard</h1>
			<TopPerformers />
			<ProjectionTable />
			<InjuryReport />
		</Box>
	)
}

export default Dashboard
