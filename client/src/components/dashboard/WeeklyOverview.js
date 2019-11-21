import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ReactTooltip from 'react-tooltip'

import PlayerImage from '../shared/PlayerImage'
import { usePagination, useWindowDimensions } from '../../utils/customHooks'
import Pagination from '../shared/Pagination'
import DashboardTableHeader, { TableRow } from './DashboardTableHeader'
import {
    getPlayerImage,
    getIsInjured,
    getPlayerInjuryDescription,
    getPlayingProb,
    getGameCount,
    getFirstLastShortened,
} from '../../apollo/dataSelectors'
import Loader from '../shared/Loader'

const playingProbToColor = {
    healthy: '#7FCFC6',
    out: '#EB604B',
    questionable: '#F4BA40',
    probable: '#F4BA40',
    doubtful: '#EB604B',
}

const WeeklyOverviewWrapper = styled(Box)`
    position: relative;
    width: 540px;
    height: 62vh;
    background: white;
    border-radius: 10px;
`

const Table = styled(Box)`
    position: relative;
    width: 96%;
    margin-bottom: 20px;
`

const Entries = styled(Box)`
    padding-bottom: 28px;
`

const Truncated = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const PlayingProbSpan = styled.span`
    color: ${props => playingProbToColor[props.playingProb]};
    font-weight: bold;
    text-transform: capitalize;
`

function WeeklyOverview({ data, loading }) {
    const { height } = useWindowDimensions()
    const MAX_PER_PAGE = height < 650 ? 3 : 4

    const { page, incrementPage, decrementPage, maxPages } = usePagination(
        data.length,
        MAX_PER_PAGE
    )

    return (
        <WeeklyOverviewWrapper align="center">
            <ReactTooltip />
            <Table>
                <h1 style={{ margin: '20px' }}>Weekly Overview</h1>
                <DashboardTableHeader
                    sizes={['xsmall', 'small', 'small', 'small', 'small']}
                    headers={['', 'Player Name', 'Injury', 'Playing Probability', 'Games']}
                />
                {loading && (
                    <div style={{ height: '100vh' }}>
                        <Loader size={50} />
                    </div>
                )}
                {!loading && (
                    <>
                        <Entries direction="column">
                            {data.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE).map(p => {
                                const isInjured = getIsInjured(p)
                                return (
                                    <TableRow>
                                        <Box direction="row" justify="center" basis="xsmall">
                                            <PlayerImage src={getPlayerImage(p)} size="XS" />
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            <b>{getFirstLastShortened(p)}</b>
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            {!isInjured && <b>N/A</b>}
                                            {isInjured && (
                                                <Truncated data-tip={getPlayerInjuryDescription(p)}>
                                                    {getPlayerInjuryDescription(p)}
                                                </Truncated>
                                            )}
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            <PlayingProbSpan
                                                playingProb={
                                                    isInjured ? getPlayingProb(p) : 'healthy'
                                                }
                                            >
                                                {isInjured && getPlayingProb(p)}
                                                {!isInjured && 'healthy'}
                                            </PlayingProbSpan>
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            {getGameCount(p)}
                                        </Box>
                                    </TableRow>
                                )
                            })}
                        </Entries>
                        <Pagination
                            increment={incrementPage}
                            decrement={decrementPage}
                            page={page}
                            totalPages={maxPages}
                        />
                    </>
                )}
            </Table>
        </WeeklyOverviewWrapper>
    )
}

export default WeeklyOverview
