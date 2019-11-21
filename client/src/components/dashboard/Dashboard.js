import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY } from '../../apollo/queries'
import WeeklyOverview from './WeeklyOverview'
import MyStats from './MyStats'
import { computeTeamStatsAverages, timeFrames } from '../../utils/computeHelpers'

const DashboardWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

const DashboardComponentWrapper = styled(Box)`
    margin: 20px;
`

export default function Dashboard() {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0])

    const { data: weeklyOverviewData, loading: weeklyOverviewLoading } = useQuery(
        WEEKLY_OVERVIEW_QUERY
    )
    const { data: statsData, loading: statsLoading } = useQuery(MY_STATS_QUERY, {
        variables: { timeFrame: selectedTimeFrame },
    })

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

    if (weeklyOverviewLoading && statsLoading) return <Loader size={80} />

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
                        timeFrames={{
                            showTimeFrames: true,
                            selectedTimeFrame,
                            setSelectedTimeFrame,
                        }}
                    />
                </DashboardComponentWrapper>
            </Box>
        </DashboardWrapper>
    )
}
