import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ReactTooltip from 'react-tooltip'

import PlayerImage from '../shared/PlayerImage'

const WeeklyOverviewWrapper = styled(Box)`
    width: 800px;
    height: 400px;
    background: #eff1f3;
`

const TableRow = styled(Box)`
    flex-direction: row;
    align-items: center;
    background: white;
    padding: 10px;
    margin: 4px 0;
`

const TableHeader = styled(Box)``

const Table = styled(Box)`
    width: 96%;
`

const Entries = styled(Box)``

const Truncated = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

function WeeklyOverview({ data }) {
    return (
        <WeeklyOverviewWrapper align="center">
            <ReactTooltip />
            <Table>
                <h1>Weekly Overview</h1>
                <TableRow direction="row">
                    <Box basis="small">
                        <TableHeader />
                    </Box>

                    <Box direction="row" justify="start" basis="small">
                        <TableHeader>Player Name</TableHeader>
                    </Box>
                    <Box
                        direction="row"
                        justify="start"
                        basis="small"
                        style={{ marginRight: '20px' }}
                    >
                        <TableHeader>Injury</TableHeader>
                    </Box>
                    <Box direction="row" justify="start" basis="small">
                        <TableHeader>Playing Probability</TableHeader>
                    </Box>
                    <Box direction="row" justify="start" basis="small">
                        <TableHeader>Games This Week</TableHeader>
                    </Box>
                </TableRow>
                <Entries direction="column">
                    {data.map(p => (
                        <TableRow direction="row" align="center">
                            <Box direction="row" justify="start" basis="small">
                                <PlayerImage src={p.imageSrc} size="XS" />
                            </Box>
                            <Box direction="row" justify="start" basis="small">
                                {p.fullName}
                            </Box>
                            <Box
                                direction="row"
                                justify="start"
                                basis="small"
                                style={{ marginRight: '20px' }}
                            >
                                <Truncated data-tip={p.description}>{p.description}</Truncated>
                            </Box>
                            <Box direction="row" justify="start" basis="small">
                                {p.playingProbability}
                            </Box>
                            <Box direction="row" justify="start" basis="small">
                                2
                            </Box>
                        </TableRow>
                    ))}
                </Entries>
            </Table>
        </WeeklyOverviewWrapper>
    )
}

export default WeeklyOverview
