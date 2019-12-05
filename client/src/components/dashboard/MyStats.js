import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'
import Loader from '../shared/Loader'
import { timeFrames } from '../../utils/computeHelpers'
import { Title } from '../general/TextComponents'
import { RoundedButton } from '../general/Buttons'

const statTypes = {
    TEAM_STATS: 'Team Stats',
    PLAYER_STATS: 'Player Stats',
}

const MyStatsWrapper = styled(Box)`
    position: relative;
    width: 440px;
    height: 82vh;
    background: white;
    border-radius: 10px;
    @media (max-height: 600px) {
        height: 90vh;
    }
`

const MyStatsLoaderWrapper = styled(Box)`
    margin-top: 25vh;
`

const StatsTableWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 400px;
    background: white;
    border-radius: 10px;
    overflow: auto;
`

const TimeFrameButton = styled(RoundedButton)`
    width: 33%;
    border: 1px solid ${props => props.theme.global.colors.brand};
    border-radius: 10px;
    padding: 0px;
    margin: 10px 4px 20px 4px;
    text-align: center;
    font-weight: bold;
    font-size: 0.7em;
    color: ${props => (props.selected ? 'white' : props.theme.global.colors.brand)};
    background: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    cursor: pointer;
`

const StatTypeHeaderWrapper = styled(Box)`
    margin: 0 10px;
`

const StatTypeHeader = styled(Title)`
    font-size: 1.4em;
    cursor: pointer;
    width: fit-content;
    margin: 10px;
    border-bottom: ${props =>
        props.selected ? `2px solid ${props.theme.global.colors.brand}` : ''};
    @media (max-width: 950px) {
        font-size: 1em;
    }
`

export default function MyStats({
    players,
    averages,
    isTradeSimulated = false,
    loading = false,
    timeFrames: { showTimeFrames, selectedTimeFrame, setSelectedTimeFrame },
}) {
    const [statType, setStatType] = useState('Team Stats')

    return useMemo(
        () => (
            <MyStatsWrapper>
                <>
                    <Box align="center">
                        <Box
                            direction="row"
                            style={{ width: '100%' }}
                            justify="between"
                            align="center"
                        >
                            <StatTypeHeaderWrapper
                                direction="row"
                                onClick={() => setStatType('Team Stats')}
                                justify="center"
                                basis="small"
                            >
                                <StatTypeHeader selected={statType === 'Team Stats'}>
                                    Team Stats
                                </StatTypeHeader>
                            </StatTypeHeaderWrapper>
                            <StatTypeHeaderWrapper
                                direction="row"
                                onClick={() => setStatType('Player Stats')}
                                justify="center"
                                basis="small"
                            >
                                <StatTypeHeader selected={statType === 'Player Stats'}>
                                    Player Stats
                                </StatTypeHeader>
                            </StatTypeHeaderWrapper>
                        </Box>
                        {showTimeFrames && (
                            <Box direction="row" align="center" style={{ width: '70%' }}>
                                {timeFrames.map(tf => (
                                    <TimeFrameButton
                                        key={tf}
                                        justify="center"
                                        onClick={() => setSelectedTimeFrame(tf)}
                                        selected={tf === selectedTimeFrame}
                                    >
                                        {tf}
                                    </TimeFrameButton>
                                ))}
                            </Box>
                        )}
                    </Box>
                    {loading && (
                        <MyStatsLoaderWrapper>
                            <Loader size={50} />
                        </MyStatsLoaderWrapper>
                    )}
                    {!loading && (
                        <StatsTableWrapper align="center">
                            {statType === 'Team Stats' && (
                                <TeamStats stats={averages} isTradeSimulated={isTradeSimulated} />
                            )}
                            {statType === 'Player Stats' && <PlayerStats players={players} />}
                        </StatsTableWrapper>
                    )}
                </>
            </MyStatsWrapper>
        ),
        [
            players,
            loading,
            averages,
            selectedTimeFrame,
            setSelectedTimeFrame,
            showTimeFrames,
            statType,
            isTradeSimulated,
        ]
    )
}
