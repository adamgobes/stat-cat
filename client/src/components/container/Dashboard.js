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

const WeeklyReportWrapper = styled(Box)`
	box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
	background-color: ${props => props.theme.global.colors.brand};
`

const ProjectionTableWrapper = styled(Box)`
	box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const TopPerformersWrapper = styled(Box)`
	box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const Dashboard = ({ dashboardData }) => {
    const { myTeam } = dashboardData
    return (
        <Box>
            <Nav showMenu showSignUp={false} />
            <Grid
                rows={['1/2', '1/2']}
                columns={['2/5', 'flex']}
                gap="small"
                areas={[
                    { name: 'weeklyReport', start: [0, 0], end: [0, 1] },
                    { name: 'projections', start: [1, 0], end: [1, 0] },
                    { name: 'topPerformers', start: [1, 1], end: [1, 1] },
                ]}
            >
                <WeeklyReportWrapper gridArea="weeklyReport">
                    <InjuryReport injuriesData={myTeam} />
                </WeeklyReportWrapper>
                <ProjectionTableWrapper gridArea="projections">
                    <ProjectionTable projectionsData={myTeam} />
                </ProjectionTableWrapper>
                <TopPerformersWrapper gridArea="topPerformers">
                    <TopPerformers topPerformersData={myTeam} />
                </TopPerformersWrapper>
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
