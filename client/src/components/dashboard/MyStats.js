import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Button, Select } from 'grommet'
import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'

const timeFrames = ['All', '7d', '1m']

const MyStatsWrapper = styled(Box)`
    position: relative;
    width: 440px;
    height: 600px;
    background: white;
    border-radius: 10px;
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
    border: 1px solid #7781f7;
    text-align: center;
    font-weight: bold;
    color: ${props => (props.selected ? 'white' : '#7781f7')};
    background: ${props => (props.selected ? '#7781f7' : 'white')};
    cursor: pointer;
`

const StatTypeHeader = styled.h2`
    cursor: pointer;
    width: fit-content;
    padding-bottom: 6px;
    border-bottom: ${props => (props.selected ? '2px solid #7781f7' : '')};
`

export default function MyStats({ players, averages, isTradeSimulated = false }) {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0])
    const [statType, setStatType] = useState('Team')

    return useMemo(
        () => (
            <MyStatsWrapper>
                <Box direction="row">
                    <Box basis="1/2" justify="start">
                        <h1 style={{ margin: '20px' }}>My Stats</h1>
                    </Box>
                    <Box direction="row" basis="1/2" align="center" style={{ marginRight: '20px' }}>
                        {timeFrames.map(tf => (
                            <TimeFrameButton
                                justify="center"
                                onClick={() => setSelectedTimeFrame(tf)}
                                selected={tf === selectedTimeFrame}
                            >
                                {tf}
                            </TimeFrameButton>
                        ))}
                    </Box>
                </Box>

                <Box align="center">
                    <Box direction="row" style={{ width: '100%' }} justify="center" align="center">
                        <Box
                            direction="row"
                            onClick={() => setStatType('Team')}
                            justify="center"
                            basis="small"
                            style={{ margin: '-12px' }}
                        >
                            <StatTypeHeader selected={statType === 'Team'}>Team</StatTypeHeader>
                        </Box>
                        <Box
                            direction="row"
                            onClick={() => setStatType('Player')}
                            justify="center"
                            basis="small"
                            style={{ margin: '-12px' }}
                        >
                            <StatTypeHeader selected={statType === 'Player'}>Player</StatTypeHeader>
                        </Box>
                    </Box>
                </Box>
                <StatsTableWrapper align="center">
                    {statType === 'Team' && (
                        <TeamStats stats={averages} isTradeSimulated={isTradeSimulated} />
                    )}
                    {statType === 'Player' && <PlayerStats players={players} />}
                </StatsTableWrapper>
            </MyStatsWrapper>
        ),
        [players, averages, selectedTimeFrame, statType]
    )
}
