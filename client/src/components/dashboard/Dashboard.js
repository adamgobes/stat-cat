import React, { useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { DASHBOARD_QUERY } from '../../apollo/queries'
import WeeklyOverview from './WeeklyOverview'
import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'

const DashboardWrapper = styled(Box)`
    position: relative;
    background: #eff1f3;
    overflow: scroll;
`

const DashboardComponentWrapper = styled(Box)`
    margin: 20px;
`

export default function Dashboard() {
    const { data: dashboardData, loading: dashboardLoading } = useQuery(DASHBOARD_QUERY)

    const teamAverages = useMemo(() => {
        const averages =
            dashboardData &&
            computeTeamStatsAverages(dashboardData.myTeam.players.map(p => p.stats))
        return averages
    }, [dashboardData])

    if (dashboardLoading) return <Loader size={80} />

    return (
        <DashboardWrapper align="center">
            <h1>Dashboard</h1>
            <Box direction="row" justify="center" align="center">
                <DashboardComponentWrapper>
                    <WeeklyOverview data={dashboardData.myTeam.players} />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper>
                    <TeamStats stats={teamAverages} />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper>
                    <PlayerStats data={dashboardData.myTeam.players} />
                </DashboardComponentWrapper>
            </Box>
        </DashboardWrapper>
    )
}
