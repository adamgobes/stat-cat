import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import DashboardTableHeader, { TableRow } from './DashboardTableHeader'

import Pagination from '../shared/Pagination'
import usePagination from '../../utils/customHooks'

import basketball from '../../assets/images/basketball.png'
import assistIcon from '../../assets/images/assist-icon.png'
import reboundIcon from '../../assets/images/rebound-icon.png'
import fgIcon from '../../assets/images/effiency.png'
import spgIcon from '../../assets/images/lock.png'
import threeIcon from '../../assets/images/three-pointer.png'
import ftIcon from '../../assets/images/money-bag.png'

const statToIcon = {
    PPG: basketball,
    APG: assistIcon,
    RPG: reboundIcon,
    SPG: spgIcon,
    FG: fgIcon,
    FT: ftIcon,
    '3PM': threeIcon,
}

const TeamStatsWrapper = styled(Box)`
    position: relative;
    width: 480px;
    min-height: 460px;
    background: white;
    border-radius: 10px;
`

const Table = styled(Box)`
    position: relative;
    width: 80%;
`

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 0;
    overflow: hidden;
`

const countingNumbers = ['PPG', 'APG', 'RPG', 'SPG', 'BPG', 'TPG']

const statsAbbreviationToFull = {
    PPG: 'Points',
    APG: 'Assists',
    RPG: 'Rebounds',
    SPG: 'Steals',
    BPG: 'Blocks',
    TPG: 'Turnovers',
    FG: 'Field Goal',
    FT: 'Free Throw',
}

function CountingNumberElement({ category, value }) {
    return (
        <TableRow>
            <Box direction="row" justify="start" basis="medium">
                {category in statToIcon && (
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img src={statToIcon[category]} width="100%" height="100%" alt="PPG" />
                        </Box>
                    </IconWrapper>
                )}
                <b>{statsAbbreviationToFull[category]}</b>
            </Box>
            <Box direction="row" justify="start" basis="medium">
                <b>{value}</b>
            </Box>
        </TableRow>
    )
}

function EfficiencyNumberElement({ category, attempted, made }) {
    return (
        <TableRow>
            <Box direction="row" align="center" basis="medium">
                {category in statToIcon && (
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img src={statToIcon[category]} width="100%" height="100%" alt="PPG" />
                        </Box>
                    </IconWrapper>
                )}
                <Box direction="column" align="start">
                    <b>{statsAbbreviationToFull[category]}</b>
                    <b>{`${made}/${attempted}`}</b>
                </Box>
            </Box>
            <Box direction="row" justify="start" basis="medium">
                <b>{`${Math.round((made * 100) / attempted)}%`}</b>
            </Box>
        </TableRow>
    )
}

export default function TeamStats({ stats }) {
    console.log({ stats })
    const { page, incrementPage, decrementPage } = usePagination(
        stats.length,
        countingNumbers.length
    )

    const efficiencyObjects = {
        FG: {
            attempted: stats.find(s => s.category === 'FGA').value,
            made: stats.find(s => s.category === 'FGM').value,
        },
        FT: {
            attempted: stats.find(s => s.category === 'FTA').value,
            made: stats.find(s => s.category === 'FTM').value,
        },
    }

    return (
        <Table>
            <DashboardTableHeader
                headers={['Statistic', 'Avg Per Game']}
                sizes={['medium', 'medium']}
                justify="start"
            />
            <Box>
                {page === 1 &&
                    stats
                        .filter(s => countingNumbers.includes(s.category))
                        .sort(
                            (s1, s2) =>
                                countingNumbers.indexOf(s1.category) -
                                countingNumbers.indexOf(s2.category)
                        )
                        .map(s => (
                            <CountingNumberElement
                                key={s.category}
                                category={s.category}
                                value={s.value}
                            />
                        ))}
                {page === 2 &&
                    Object.keys(efficiencyObjects).map(s => (
                        <EfficiencyNumberElement
                            key={s.category}
                            category={s}
                            attempted={efficiencyObjects[s].attempted}
                            made={efficiencyObjects[s].made}
                        />
                    ))}
            </Box>
            <Pagination increment={incrementPage} decrement={decrementPage} />
        </Table>
    )
}
