import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Select } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import { allStats } from '../../utils/computeHelpers'
import DashboardTableHeader, { TableRow } from './DashboardTableHeader'

const Table = styled(Box)`
    max-height: 500px;
    sposition: relative;
    width: 96%;
`

const StatDropdownContainer = styled.div`
    width: 104px;
    border: 1px solid white;
    border-radius: 10px;
`

const findStat = (statsArray, stat) => statsArray.find(s => s.category === stat).value

function PlayerStats({ stats }) {
    const [selectedStat, setSelectedStat] = useState('PPG')

    const sortedData = useMemo(
        () =>
            stats.sort((player1, player2) => {
                const stat1 = findStat(player1.stats, selectedStat)
                const stat2 = findStat(player2.stats, selectedStat)

                return stat2 - stat1
            }),
        [selectedStat, stats]
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
                    <TableRow flex={false}>
                        <Box direction="row" justify="center" basis="xsmall">
                            <PlayerImage src={player.imageSrc} size="XS" />
                        </Box>
                        <Box direction="row" justify="center" basis="small">
                            <b>{player.fullName}</b>
                        </Box>
                        <Box direction="row" justify="center" basis="small">
                            {findStat(player.stats, selectedStat)}
                        </Box>
                    </TableRow>
                ))}
            </Box>
        </Table>
    )
}

export default PlayerStats
