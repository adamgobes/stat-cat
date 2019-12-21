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
import { Title, Text } from '../shared/TextComponents'
import Loader from '../shared/Loader'

const playingProbToColor = {
    healthy: '#7FCFC6',
    out: '#EB604B',
    questionable: '#F4BA40',
    probable: '#F4BA40',
    doubtful: '#EB604B',
}

const heightToElementsDisplayed = {
    750: 6,
    650: 5,
    600: 4,
}

function calculateMaxPerPage(height) {
    const sortedHeights = Object.keys(heightToElementsDisplayed).sort((a, b) => b - a)
    const matchingHeight = sortedHeights.reduce((currentHeight, nextHeight) => {
        if (height <= currentHeight) return nextHeight
        return currentHeight
    }, sortedHeights[0])

    return heightToElementsDisplayed[matchingHeight]
}

const WeeklyOverviewWrapper = styled(Box)`
    position: relative;
    width: 540px;
    height: 82vh;
    background: white;
    border-radius: 10px;
`

const WeeklyOverviewTitle = styled(Title)`
    margin: 20px;
    text-align: center;
`

const WeeklyOverviewText = styled(Text)`
    font-size: 0.8em;
`

const Table = styled(Box)`
    position: relative;
    width: 96%;
    margin-bottom: 20px;
`

const Entries = styled(Box)`
    padding-bottom: 28px;
`

const Truncated = styled(WeeklyOverviewText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const PlayingProbText = styled(WeeklyOverviewText)`
    color: ${props => playingProbToColor[props.playingProb]};
    font-weight: bold;
    text-transform: capitalize;
`

function WeeklyOverview({ data, loading }) {
    const { height } = useWindowDimensions()
    const MAX_PER_PAGE = calculateMaxPerPage(height)

    const { page, incrementPage, decrementPage, maxPages } = usePagination(
        data.length,
        MAX_PER_PAGE
    )

    return (
        <WeeklyOverviewWrapper align="center">
            <ReactTooltip />
            <Table>
                <WeeklyOverviewTitle>Weekly Overview</WeeklyOverviewTitle>
                <DashboardTableHeader
                    sizes={['xsmall', 'small', 'small', 'small', 'small']}
                    headers={['', 'Player Name', 'Injury', 'Playing Prob.', 'Games']}
                />
                {loading && (
                    <div style={{ height: '60vh' }}>
                        <Loader size={50} />
                    </div>
                )}
                {!loading && (
                    <>
                        <Entries direction="column">
                            {data.slice((page - 1) * MAX_PER_PAGE, page * MAX_PER_PAGE).map(p => {
                                const isInjured = getIsInjured(p)
                                return (
                                    <TableRow key={p.id}>
                                        <Box direction="row" justify="center" basis="xsmall">
                                            <PlayerImage src={getPlayerImage(p)} size="XS" />
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            <WeeklyOverviewText>
                                                {getFirstLastShortened(p)}
                                            </WeeklyOverviewText>
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            {!isInjured && (
                                                <WeeklyOverviewText>N/A</WeeklyOverviewText>
                                            )}
                                            {isInjured && (
                                                <Truncated data-tip={getPlayerInjuryDescription(p)}>
                                                    {getPlayerInjuryDescription(p)}
                                                </Truncated>
                                            )}
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            <PlayingProbText
                                                playingProb={
                                                    isInjured ? getPlayingProb(p) : 'healthy'
                                                }
                                            >
                                                {isInjured && getPlayingProb(p)}
                                                {!isInjured && 'healthy'}
                                            </PlayingProbText>
                                        </Box>
                                        <Box direction="row" justify="center" basis="small">
                                            <WeeklyOverviewText>
                                                {getGameCount(p)}
                                            </WeeklyOverviewText>
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
