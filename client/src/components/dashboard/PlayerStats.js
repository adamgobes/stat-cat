import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Select, Button } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import { allStats } from '../../utils/computeHelpers'
import Pagination from '../shared/Pagination'
import usePagination from '../../utils/customHooks'
import DashboardTableHeader, { TableRow } from './DashboardTable'

const MAX_PER_PAGE = 4

const timeFrames = ['All', 'Week', 'Month']

const PlayerStatsWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 600px;
    background: #f9fafe;
`

const Table = styled(Box)`
    position: relative;
    width: 96%;
`

const StatDropdownContainer = styled.div`
    width: 104px;
    border: 1px solid ${props => props.theme.global.colors.brand};
    border-radius: 10px;
`

const TimeFrameButton = styled(Button)`
    background: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    border: 1px solid ${props => props.theme.global.colors.brand};
    color: ${props => (!props.selected ? props.theme.global.colors.brand : 'white')};
    font-weight: bold;
    padding: 4px 10px;
`

const findStat = (statsArray, stat) => statsArray.find(s => s.category === stat).value

function PlayerStats({ data }) {
    const [selectedStat, setSelectedStat] = useState('PPG')
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrames[0])
    const { page, incrementPage, decrementPage } = usePagination(data.length, MAX_PER_PAGE)

    const sortedData = useMemo(
        () =>
            data.sort((player1, player2) => {
                const stat1 = findStat(player1.stats, selectedStat)
                const stat2 = findStat(player2.stats, selectedStat)

                return stat2 - stat1
            }),
        [selectedStat, data]
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
        <PlayerStatsWrapper align="center">
            <h1>Player Stats</h1>
            <Box direction="row" style={{ width: '40%', margin: '20px 0' }}>
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
            <Table>
                <DashboardTableHeader
                    sizes={['xsmall', 'small', 'small']}
                    headers={['', 'Player Name', <StatDropdown />]}
                />
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
            <Pagination increment={incrementPage} decrement={decrementPage} />
        </PlayerStatsWrapper>
    )
}

export default PlayerStats
