import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { LinkUp, LinkDown } from 'grommet-icons'

import DashboardTableHeader, { TableRow } from './DashboardTableHeader'
import { Text } from '../shared/TextComponents'

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
const tradeHeaders = ['Statistic', 'Before', 'After', 'Delta']

const Table = styled(Box)`
    position: relative;
    max-height: 500px;
    width: 90%;
`

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin: 0 10px 0 0;
    overflow: hidden;
`

const StatCategoryText = styled(Text)`
    font-size: 0.8em;
`

const Percentage = styled(StatCategoryText)`
    color: ${props => (props.positive ? 'green' : 'red')};
`

const countingNumbers = ['PPG', 'APG', 'RPG', '3PM', 'SPG', 'BPG', 'TPG']

const statsAbbreviationToFull = {
    PPG: 'Points',
    APG: 'Assists',
    RPG: 'Rebounds',
    '3PM': 'Threes',
    SPG: 'Steals',
    BPG: 'Blocks',
    TPG: 'Turnovers',
    FG: 'Field Goal',
    FT: 'Free Throw',
}

function computePercentage(attempted, made) {
    return Math.round((made * 100) / attempted)
}

function PercentageChangeIndicator({ category, currentValue, tradeValue }) {
    const percentageChange = Math.abs(
        (parseFloat((tradeValue - currentValue) * 100) / parseFloat(currentValue)).toFixed(2)
    )

    const isTurnoverStat = category === 'TPG'

    return (
        <Box direction="row">
            <Percentage
                positive={
                    (tradeValue > currentValue && !isTurnoverStat) ||
                    (tradeValue < currentValue && isTurnoverStat)
                }
            >
                {percentageChange !== 0 && `${percentageChange}%`}
            </Percentage>
            {tradeValue > currentValue && (
                <IconWrapper>
                    {!isTurnoverStat && <LinkUp color="green" size="XS" />}
                    {isTurnoverStat && <LinkDown color="red" size="XS" />}
                </IconWrapper>
            )}
            {tradeValue < currentValue && (
                <IconWrapper>
                    {!isTurnoverStat && <LinkDown color="red" size="XS" />}
                    {isTurnoverStat && <LinkUp color="green" size="XS" />}
                </IconWrapper>
            )}
        </Box>
    )
}

function CountingNumberElement({ category, values, isTradeSimulated }) {
    return (
        <TableRow>
            <Box direction="row" justify="center" basis="small">
                {category in statToIcon && (
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img src={statToIcon[category]} width="100%" height="100%" alt="PPG" />
                        </Box>
                    </IconWrapper>
                )}
                <StatCategoryText>{statsAbbreviationToFull[category]}</StatCategoryText>
            </Box>
            {values.map((value, i) => (
                <Box direction="row" justify="center" basis="small" key={i}>
                    <StatCategoryText>{value}</StatCategoryText>
                </Box>
            ))}
            {isTradeSimulated && (
                <Box direction="row" basis="small" justify="center">
                    <PercentageChangeIndicator
                        currentValue={values[0]}
                        tradeValue={values[1]}
                        category={category}
                    />
                </Box>
            )}
        </TableRow>
    )
}

function EfficiencyNumberElement({ category, attempted, made, isTradeSimulated }) {
    return (
        <TableRow>
            <Box direction="row" align="center" justify="center" basis="small">
                {category in statToIcon && (
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img src={statToIcon[category]} width="100%" height="100%" alt="PPG" />
                        </Box>
                    </IconWrapper>
                )}
                <StatCategoryText>{statsAbbreviationToFull[category]}</StatCategoryText>
            </Box>
            {attempted.map((_, i) => (
                <Box basis="small" align="center" key={i}>
                    <Box direction="row" justify="start">
                        <StatCategoryText>
                            {`${computePercentage(attempted[i], made[i])}%`}
                        </StatCategoryText>
                    </Box>
                    <Box direction="column" align="start">
                        <StatCategoryText>{`${made[i]}/${attempted[i]}`}</StatCategoryText>
                    </Box>
                </Box>
            ))}
            {isTradeSimulated && (
                <Box direction="row" basis="small" justify="center">
                    <PercentageChangeIndicator
                        currentValue={computePercentage(attempted[0], made[0])}
                        tradeValue={computePercentage(attempted[1], made[1])}
                    />
                </Box>
            )}
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
                sizes={
                    isTradeSimulated ? ['small', 'small', 'small', 'small'] : ['medium', 'medium']
                }
                justify="center"
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
                        key={s}
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
