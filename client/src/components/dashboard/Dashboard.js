import React, { useMemo, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { Box } from 'grommet'

import Loader from '../shared/Loader'
import { WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY } from '../../apollo/queries'
import WeeklyOverview from './WeeklyOverview'
import MyStats from './MyStats'
import { computeTeamStatsAverages, timeFrames } from '../../utils/computeHelpers'
import FallbackMessage from '../general/FallbackMessage'
import { NETWORK_ERROR_MESSAGE, TEAM_EMPTY_MESSAGE } from '../../utils/strings'

const DashboardWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

const DashboardComponentWrapper = styled(Box)`
    margin: 60px 20px 20px 20px;
`

export default function Dashboard() {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0])

    const {
        data: weeklyOverviewData,
        loading: weeklyOverviewLoading,
        error: weeklyOverviewError,
    } = useQuery(WEEKLY_OVERVIEW_QUERY)

    const { data: statsData, loading: statsLoading, error: myStatsError } = useQuery(
        MY_STATS_QUERY,
        {
            variables: { timeFrame: selectedTimeFrame },
            fetchPolicy: 'cache-and-network',
        }
    )

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

    if (myStatsError) return <FallbackMessage message={NETWORK_ERROR_MESSAGE} showReload />
    if (weeklyOverviewError) return <FallbackMessage message={NETWORK_ERROR_MESSAGE} showReload />

    if (weeklyOverviewLoading && statsLoading) return <Loader size={80} />

    if (!weeklyOverviewLoading && weeklyOverviewData.myTeam.players.length === 0)
        return <FallbackMessage message={TEAM_EMPTY_MESSAGE} />

    return (
        <DashboardWrapper align="center" justify="start">
            <Box direction="row" justify="center" align="start">
                <DashboardComponentWrapper data-testid="weeklyoverview">
                    <WeeklyOverview
                        data={!weeklyOverviewLoading && weeklyOverviewData.myTeam.players}
                        loading={weeklyOverviewLoading}
                    />
                </DashboardComponentWrapper>
                <DashboardComponentWrapper data-testid="mystats">
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
