import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Button, Select } from 'grommet'
import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'

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

const TimeFrameDropdownContainer = styled(Button)`
    width: 104px;
    border: 1px solid #7781f7;
    border-radius: 10px;
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

    console.log({ players, averages })

    return (
        <MyStatsWrapper>
            <h1 style={{ margin: '20px' }}>My Stats</h1>
            <Box align="center">
                <Box direction="row" style={{ width: '100%' }} justify="center" align="center">
                    <Box
                        direction="row"
                        onClick={() => setStatType('Team')}
                        justify="center"
                        basis="small"
                    >
                        <StatTypeHeader selected={statType === 'Team'}>Team</StatTypeHeader>
                    </Box>
                    <Box
                        direction="row"
                        onClick={() => setStatType('Player')}
                        justify="center"
                        basis="small"
                    >
                        <StatTypeHeader selected={statType === 'Player'}>Player</StatTypeHeader>
                    </Box>
                    <Box direction="row" justify="center" basis="small">
                        <TimeFrameDropdownContainer>
                            <Select
                                options={timeFrames}
                                value={selectedTimeFrame}
                                onChange={option => setSelectedTimeFrame(option.value)}
                                size="small"
                                plain
                            />
                        </TimeFrameDropdownContainer>
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
    )
}
