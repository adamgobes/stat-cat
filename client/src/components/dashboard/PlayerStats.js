import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Select } from 'grommet'
import { Previous, Next } from 'grommet-icons'

import PlayerImage from '../shared/PlayerImage'
import { allStats } from '../../utils/computeHelpers'
import { PaginationComponent, PaginationButton } from './WeeklyOverview'

const MAX_PER_PAGE = 4

const PlayerStatsWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 540px;
    background: #f9fafe;
`

const Table = styled(Box)`
    position: relative;
    width: 96%;
`

const TableRow = styled(Box)`
    flex-direction: row;
    align-items: center;
    background: white;
    padding: 10px;
    margin: 4px 0;
    border-radius: 10px;
`

const StatDropdownContainer = styled.div`
    width: 104px;
    border: 1px solid ${props => props.theme.global.colors.brand};
    border-radius: 10px;
`

const findStat = (statsArray, stat) => statsArray.find(s => s.category === stat).value

function PlayerStats({ data }) {
    const [selectedStat, setSelectedStat] = useState('PPG')

    const [page, setPage] = useState(1)

    function incrementPage() {
        const maxPages = Math.ceil(data.length / MAX_PER_PAGE)
        if (page < maxPages) {
            setPage(page + 1)
        }
    }

    function decrementPage() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const sortedData = useMemo(
        () =>
            data.sort((player1, player2) => {
                const stat1 = findStat(player1.stats, selectedStat)
                const stat2 = findStat(player2.stats, selectedStat)

                return stat2 - stat1
            }),
        [selectedStat, data]
    )

    return (
        <PlayerStatsWrapper align="center">
            <h1>Player Stats</h1>
            <Table>
                <TableRow style={{ margin: '14px 0' }}>
                    <Box basis="xsmall">
                        <Box />
                    </Box>
                    <Box direction="row" justify="center" basis="small">
                        <Box>Player</Box>
                    </Box>
                    <Box direction="row" justify="center" basis="small">
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
                    </Box>
                </TableRow>
                <Box>
                    {sortedData
                        .slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE)
                        .map(player => (
                            <TableRow>
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
            <PaginationComponent direction="row" justify="evenly">
                <PaginationButton align="center" onClick={decrementPage}>
                    <Previous size="small" />
                </PaginationButton>
                <PaginationButton align="center" onClick={incrementPage}>
                    <Next size="small" />
                </PaginationButton>
            </PaginationComponent>
        </PlayerStatsWrapper>
    )
}

export default PlayerStats
