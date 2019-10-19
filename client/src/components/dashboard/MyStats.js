import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import TeamStats from './TeamStats'
import PlayerStats from './PlayerStats'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'

const timeFrames = ['All', '7d', '1m']

const MyStatsWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 550px;
    background: white;
    border-radius: 10px;
`

const PlayerStatsWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 400px;
    background: white;
    border-radius: 10px;
`

const TimeFrameButton = styled(Button)`
    background: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    border: 1px solid ${props => props.theme.global.colors.brand};
    color: ${props => (!props.selected ? props.theme.global.colors.brand : 'white')};
    font-weight: bold;
    padding: 4px 4px;
    text-align: center;
`

export default function MyStats({ playerStats }) {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0])
    const [statType, setStatType] = useState('Team')

    const teamAverages = useMemo(() => {
        const averages =
            playerStats && computeTeamStatsAverages(playerStats.map(player => player.stats))
        return averages
    }, [playerStats])

    return (
        <MyStatsWrapper align="center">
            <h1>My Stats</h1>
            <Box direction="row" style={{ width: '100%' }} justify="evenly" align="center">
                <Box
                    onClick={() => setStatType('Team')}
                    style={{ borderBottom: statType === 'Team' ? '1px solid black' : '' }}
                    basis="xsmall"
                >
                    <h2>Team</h2>
                </Box>
                <Box
                    onClick={() => setStatType('Player')}
                    style={{ borderBottom: statType === 'Player' ? '1px solid black' : '' }}
                    basis="xsmall"
                >
                    <h2>Player</h2>
                </Box>
                <Box direction="row" basis="small">
                    {timeFrames.map(t => (
                        <Box basis="1/3">
                            <TimeFrameButton
                                onClick={() => setSelectedTimeFrame(t)}
                                selected={t === selectedTimeFrame}
                            >
                                {t}
                            </TimeFrameButton>
                        </Box>
                    ))}
                </Box>
            </Box>
            <PlayerStatsWrapper align="center">
                {console.log({ teamAverages })}
                {statType === 'Team' && <TeamStats stats={teamAverages} />}
                {statType === 'Player' && <PlayerStats stats={playerStats} />}
            </PlayerStatsWrapper>
        </MyStatsWrapper>
    )
}
