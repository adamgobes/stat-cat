import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ReactTooltip from 'react-tooltip'

import PlayerImage from '../shared/PlayerImage'
import usePagination from '../../utils/customHooks'
import Pagination from '../shared/Pagination'
import DashboardTableHeader, { TableRow } from './DashboardTableHeader'

const MAX_PER_PAGE = 4

const playingProbToColor = {
    OUT: '#EB604B',
    QUESTIONABLE: '#F4BA40',
}

const WeeklyOverviewWrapper = styled(Box)`
    position: relative;
    width: 540px;
    min-height: 450px;
    background: white;
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
                <h1 style={{ margin: '20px' }}>Weekly Overview</h1>
                <DashboardTableHeader
                    sizes={['xsmall', 'small', 'small', 'small', 'small']}
                    headers={['', 'Player Name', 'Injury', 'Playing Probability', 'Games']}
                />
                <Entries direction="column">
                    {data.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE).map(p => (
                        <TableRow>
                            <Box direction="row" justify="center" basis="xsmall">
                                <PlayerImage src={p.imageSrc} size="XS" />
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                <b>{`${p.firstName.charAt(0)}. ${p.lastName}`}</b>
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                {!p.injury && <b>N/A</b>}
                                {p.injury && (
                                    <Truncated data-tip={p.injury.description}>
                                        {p.injury.description}
                                    </Truncated>
                                )}
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                <span
                                    style={{
                                        color: p.injury
                                            ? playingProbToColor[p.injury.playingProbability]
                                            : '#7FCFC6',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {p.injury && p.injury.playingProbability}
                                    {!p.injury && 'Healthy'}
                                </span>
                            </Box>
                            <Box direction="row" justify="center" basis="small">
                                {p.gameCountThisWeek}
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
