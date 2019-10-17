import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ReactTooltip from 'react-tooltip'
import { Previous, Next } from 'grommet-icons'

import PlayerImage from '../shared/PlayerImage'
import usePagination from '../../utils/customHooks'
import Pagination from '../shared/Pagination'

const MAX_PER_PAGE = 3

const playingProbToColor = {
    OUT: '#EB604B',
    PROBABLE: '#F4BA40',
    HEALTHY: '#7FCF86',
}

const WeeklyOverviewWrapper = styled(Box)`
    position: relative;
    width: 740px;
    min-height: 420px;
    background: #f9fafe;
`

const TableRow = styled(Box)`
    flex-direction: row;
    align-items: center;
    background: white;
    padding: 10px;
    margin: 4px 0;
    border-radius: 10px;
`

const Table = styled(Box)`
    position: relative;
    width: 96%;
`

const Entries = styled(Box)``

const Truncated = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

function WeeklyOverview({ data }) {
    const { page, incrementPage, decrementPage } = usePagination(data.length, MAX_PER_PAGE)

    return (
        <WeeklyOverviewWrapper align="center">
            <ReactTooltip />
            <Table>
                <h1>Weekly Overview</h1>
                <TableRow style={{ margin: '14px 0' }}>
                    <Box basis="xsmall">
                        <Box />
                    </Box>

                    <Box direction="row" justify="center" basis="small">
                        <Box>Player Name</Box>
                    </Box>
                    <Box direction="row" justify="center" basis="small">
                        <Box>Injury</Box>
                    </Box>
                    <Box direction="row" justify="center" basis="small">
                        <Box>Playing Probability</Box>
                    </Box>
                    <Box direction="row" justify="center" basis="small">
                        <Box>Games This Week</Box>
                    </Box>
                </TableRow>
                <Entries direction="column">
                    {data.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE).map(p => (
                        <TableRow>
                            <Box direction="row" justify="center" basis="xsmall">
                                <PlayerImage src={p.imageSrc} size="XS" />
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                <b>{p.fullName}</b>
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                <Truncated data-tip={p.description}>{p.description}</Truncated>
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                <span
                                    style={{
                                        color: playingProbToColor[p.playingProbability],
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {p.playingProbability}
                                </span>
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                {Math.floor(Math.random() * 3) + 1}
                            </Box>
                        </TableRow>
                    ))}
                </Entries>
            </Table>
            <Pagination increment={incrementPage} decrement={decrementPage} />
        </WeeklyOverviewWrapper>
    )
}

export default WeeklyOverview
