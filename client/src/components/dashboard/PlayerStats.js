import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Select } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import { allStats } from '../../utils/computeHelpers'
import DashboardTableHeader from './DashboardTableHeader'
import { getPlayerImage, getFirstLastShortened } from '../../apollo/dataSelectors'
import { Text } from '../shared/TextComponents'

const Table = styled(Box)`
    max-height: 500px;
    position: relative;
    width: 96%;
`

const StatDropdownContainer = styled.div`
    width: 104px;
    border: 1px solid white;
    border-radius: 10px;
`

const PlayerRow = styled(Box)`
    flex-direction: row;
    align-items: center;
    background: ${props => (props.isTraded ? '#549E66' : 'white')};
    padding: 10px;
    margin: 4px 0;
    border-radius: 10px;
`

const PlayerText = styled(Box)`
    color: ${props => (props.isTraded ? 'white' : '')};
`

const findStat = (statsArray, stat) => statsArray.find(s => s.category === stat).value

function PlayerStats({ players }) {
    const [selectedStat, setSelectedStat] = useState('PPG')

    const sortedData = useMemo(
        () =>
            players.sort((player1, player2) => {
                const stat1 = findStat(player1.stats, selectedStat)
                const stat2 = findStat(player2.stats, selectedStat)

                return stat2 - stat1
            }),
        [selectedStat, players]
    )

    const StatDropdown = () => (
        <Box>
            <StatDropdownContainer>
                <Select
                    options={allStats}
                    value={selectedStat}
                    onChange={option => setSelectedStat(option.value)}
                    size="small"
                    plain
                />
            </StatDropdownContainer>
        </Box>
    )

    return (
        <Table>
            <DashboardTableHeader
                sizes={['xsmall', 'small', 'small']}
                headers={['', 'Player Name', <StatDropdown />]}
            />
            <Box style={{ overflow: 'hidden', overflowY: 'scroll' }}>
                {sortedData.map(player => (
                    <PlayerRow flex={false} key={player.id} isTraded={player.isTraded}>
                        <Box direction="row" justify="center" basis="xsmall">
                            <PlayerImage
                                src={getPlayerImage(player)}
                                size="XS"
                                borderColor={player.isTraded ? 'white' : null}
                            />
                        </Box>
                        <PlayerText
                            direction="row"
                            justify="center"
                            basis="small"
                            isTraded={player.isTraded}
                        >
                            <Text>{getFirstLastShortened(player)}</Text>
                        </PlayerText>
                        <PlayerText
                            direction="row"
                            justify="center"
                            basis="small"
                            isTraded={player.isTraded}
                        >
                            <Text>{findStat(player.stats, selectedStat)}</Text>
                        </PlayerText>
                    </PlayerRow>
                ))}
            </Box>
        </Table>
    )
}

export default PlayerStats
