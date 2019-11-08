import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { LinkUp, LinkDown } from 'grommet-icons'

import DashboardTableHeader, { TableRow } from './DashboardTableHeader'

import basketball from '../../assets/images/basketball.png'
import assistIcon from '../../assets/images/assist-icon.png'
import reboundIcon from '../../assets/images/rebound-icon.png'
import fgIcon from '../../assets/images/effiency.png'
import spgIcon from '../../assets/images/lock.png'
import threeIcon from '../../assets/images/three-pointer.png'
import ftIcon from '../../assets/images/money-bag.png'
import turnoverIcon from '../../assets/images/turnover.png'
import blocksIcon from '../../assets/images/block.png'

const statToIcon = {
    PPG: basketball,
    APG: assistIcon,
    RPG: reboundIcon,
    SPG: spgIcon,
    FG: fgIcon,
    FT: ftIcon,
    TPG: turnoverIcon,
    BPG: blocksIcon,
    '3PM': threeIcon,
}

const headers = ['Statistic', 'Avg Per Game']
const tradeHeaders = ['Statistic', 'Before', 'After']

const Table = styled(Box)`
    position: relative;
    width: 90%;
`

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 0;
    overflow: hidden;
`

const Percentage = styled.b`
    color: ${props => (props.positive ? 'green' : 'red')};
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

function computePercentage(attempted, made) {
    return Math.round((made * 100) / attempted)
}

function PercentageChangeIndicator({ currentValue, tradeValue }) {
    const percentageChange = Math.abs(
        (parseFloat(tradeValue - currentValue) / parseFloat(currentValue)).toFixed(2)
    )

    return (
        <Box direction="row">
            <Percentage positive={tradeValue > currentValue}>
                {percentageChange !== 0 && `${percentageChange}%`}
            </Percentage>
            {tradeValue > currentValue && (
                <IconWrapper>
                    <LinkUp color="green" size="XS" />
                </IconWrapper>
            )}
            {tradeValue < currentValue && (
                <IconWrapper>
                    <LinkDown color="red" size="XS" />
                </IconWrapper>
            )}
        </Box>
    )
}

function CountingNumberElement({ category, values, isTradeSimulated }) {
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
            {values.map((value, i) => (
                <Box direction="column" justify="start" basis="medium">
                    <b>{value}</b>
                    {i === 1 && isTradeSimulated && (
                        <PercentageChangeIndicator currentValue={values[0]} tradeValue={value} />
                    )}
                </Box>
            ))}
        </TableRow>
    )
}

function EfficiencyNumberElement({ category, attempted, made, isTradeSimulated }) {
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
                <b>{statsAbbreviationToFull[category]}</b>
            </Box>
            {attempted.map((_, i) => (
                <Box basis="medium">
                    <Box direction="row" justify="start">
                        <b>{`${computePercentage(attempted[i], made[i])}%`}</b>
                    </Box>
                    <Box direction="column" align="start">
                        <b>{`${made[i]}/${attempted[i]}`}</b>
                        {i === 1 && isTradeSimulated && (
                            <PercentageChangeIndicator
                                currentValue={computePercentage(attempted[0], made[0])}
                                tradeValue={computePercentage(attempted[1], made[1])}
                            />
                        )}
                    </Box>
                </Box>
            ))}
        </TableRow>
    )
}

export default function TeamStats({ stats, isTradeSimulated }) {
    const efficiencyObjects = {
        FG: {
            attempted: [...stats.find(s => s.category === 'FGA').values],
            made: [...stats.find(s => s.category === 'FGM').values],
        },
        FT: {
            attempted: [...stats.find(s => s.category === 'FTA').values],
            made: [...stats.find(s => s.category === 'FTM').values],
        },
    }

    return (
        <Table>
            <DashboardTableHeader
                headers={isTradeSimulated ? tradeHeaders : headers}
                sizes={isTradeSimulated ? ['small', 'small', 'small'] : ['medium', 'medium']}
                justify="start"
            />
            <Box>
                {stats
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
                            values={s.values}
                            isTradeSimulated={isTradeSimulated}
                        />
                    ))}
                {Object.keys(efficiencyObjects).map(s => (
                    <EfficiencyNumberElement
                        key={s.category}
                        category={s}
                        attempted={efficiencyObjects[s].attempted}
                        made={efficiencyObjects[s].made}
                        isTradeSimulated={isTradeSimulated}
                    />
                ))}
            </Box>
        </Table>
    )
}
