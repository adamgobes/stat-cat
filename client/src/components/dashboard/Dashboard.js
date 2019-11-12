import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { DASHBOARD_QUERY } from '../../apollo/queries'
import WeeklyOverview from './WeeklyOverview'
import MyStats from './MyStats'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'

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

    const myTeamAverages = useMemo(() => {
        const averages =
            dashboardData &&
            computeTeamStatsAverages(dashboardData.myTeam.players.map(player => player.stats)).map(
                stat => ({
                    category: stat.category,
                    values: [stat.value],
                })
            )
        return averages
    }, [dashboardData])

    if (dashboardLoading) return <Loader size={80} />

    return (
        <DashboardWrapper align="center" justify="start">
            <h1>Dashboard</h1>
            <Box direction="row" justify="center" align="start">
                <DashboardComponentWrapper>
                    <WeeklyOverview data={dashboardData.myTeam.players} />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper>
                    <MyStats players={dashboardData.myTeam.players} averages={myTeamAverages} />
                </DashboardComponentWrapper>
            </Box>
        </DashboardWrapper>
    )
}
