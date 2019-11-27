import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'
import Loader from '../shared/Loader'
import { timeFrames } from '../../utils/computeHelpers'

const MyStatsWrapper = styled(Box)`
    position: relative;
    width: 440px;
    height: 80vh;
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

const TimeFrameButton = styled(Box)`
    width: 33%;
    height: 50%;
    border: 1px solid ${props => props.theme.global.colors.brand};
    text-align: center;
    font-weight: bold;
    color: ${props => (props.selected ? 'white' : props.theme.global.colors.brand)};
    background: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    cursor: pointer;
`

const StatTypeHeaderWrapper = styled(Box)`
    margin: -12px;
`

const StatTypeHeader = styled.h2`
    cursor: pointer;
    width: fit-content;
    padding-bottom: 6px;
    border-bottom: ${props =>
        props.selected ? `2px solid ${props.theme.global.colors.brand}` : ''};
`

export default function MyStats({
    players,
    averages,
    isTradeSimulated = false,
    loading = false,
    timeFrames: { showTimeFrames, selectedTimeFrame, setSelectedTimeFrame },
}) {
    const [statType, setStatType] = useState('Team')

    return useMemo(
        () => (
            <MyStatsWrapper>
                <Box direction="row">
                    <Box basis="1/2" justify="start">
                        <h1 style={{ margin: '20px' }}>My Stats</h1>
                    </Box>
                    {showTimeFrames && (
                        <Box
                            direction="row"
                            basis="1/2"
                            align="center"
                            style={{ marginRight: '20px' }}
                        >
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
                    <>
                        <Box align="center">
                            <Box
                                direction="row"
                                style={{ width: '100%' }}
                                justify="center"
                                align="center"
                            >
                                <StatTypeHeaderWrapper
                                    direction="row"
                                    onClick={() => setStatType('Team')}
                                    justify="center"
                                    basis="small"
                                >
                                    <StatTypeHeader selected={statType === 'Team'}>
                                        Team
                                    </StatTypeHeader>
                                </StatTypeHeaderWrapper>
                                <StatTypeHeaderWrapper
                                    direction="row"
                                    onClick={() => setStatType('Player')}
                                    justify="center"
                                    basis="small"
                                >
                                    <StatTypeHeader selected={statType === 'Player'}>
                                        Player
                                    </StatTypeHeader>
                                </StatTypeHeaderWrapper>
                            </Box>
                        </Box>

                        <StatsTableWrapper align="center">
                            {statType === 'Team' && (
                                <TeamStats stats={averages} isTradeSimulated={isTradeSimulated} />
                            )}
                            {statType === 'Player' && <PlayerStats players={players} />}
                        </StatsTableWrapper>
                    </>
                )}
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
