import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { DASHBOARD_QUERY } from '../../apollo/queries'
import WeeklyOverview from './WeeklyOverview'
import MyStats from './MyStats'

const DashboardWrapper = styled(Box)`
    position: relative;
    background: #eff1f3;
    height: 100%;
    overflow: scroll;
`

const DashboardComponentWrapper = styled(Box)`
    margin: 20px;
`

export default function Dashboard() {
    const { data: dashboardData, loading: dashboardLoading } = useQuery(DASHBOARD_QUERY)

    if (dashboardLoading) return <Loader size={80} />

    return (
        <DashboardWrapper align="center" justify="start">
            <h1>Dashboard</h1>
            <Box direction="row" justify="center" align="start">
                <DashboardComponentWrapper>
                    <WeeklyOverview data={dashboardData.myTeam.players} />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper>
                    <MyStats playerStats={dashboardData.myTeam.players} />
                </DashboardComponentWrapper>
            </Box>
        </DashboardWrapper>
    )
}
