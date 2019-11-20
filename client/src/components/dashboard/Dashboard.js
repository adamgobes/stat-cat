import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { DASHBOARD_QUERY, WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY } from '../../apollo/queries'
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
    const { data: weeklyOverviewData, loading: weeklyOverviewLoading } = useQuery(
        WEEKLY_OVERVIEW_QUERY
    )
    const { data: statsData, loading: statsLoading, refetch } = useQuery(MY_STATS_QUERY)

    const myTeamAverages = useMemo(() => {
        const averages =
            statsData &&
            computeTeamStatsAverages(statsData.myTeam.players.map(player => player.stats)).map(
                stat => ({
                    category: stat.category,
                    values: [stat.value],
                })
            )
        return averages
    }, [statsData])

    return (
        <DashboardWrapper align="center" justify="start">
            <h1>Dashboard</h1>
            <Box direction="row" justify="center" align="start">
                <DashboardComponentWrapper>
                    <WeeklyOverview
                        data={!weeklyOverviewLoading && weeklyOverviewData.myTeam.players}
                        loading={weeklyOverviewLoading}
                    />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper>
                    <MyStats
                        players={!statsLoading && statsData.myTeam.players}
                        averages={myTeamAverages}
                        loading={statsLoading}
                        refetch={refetch}
                        showTimeFrames
                    />
                </DashboardComponentWrapper>
            </Box>
        </DashboardWrapper>
    )
}
