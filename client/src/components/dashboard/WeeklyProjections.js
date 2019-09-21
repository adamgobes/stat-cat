import React, { useState } from 'react'
import { Box, Select } from 'grommet'
import styled from 'styled-components'

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
    'FG%': fgIcon,
    'FT%': ftIcon,
    '3PM': threeIcon,
}

const ProjectionsContainer = styled(Box)`
    height: 500px;
`

const ProjectionsHeader = styled.h1`
    margin: 30px 20px;
`

const DropdownContainer = styled.div`
    width: 140px;
`

const ProjectionElement = styled(Box)`
    width: 160px;
    height: 90px;
    background-color: white;
    margin: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    overflow: hidden;
`

const Value = styled.div`
    font-weight: bold;
    font-size: 1.2em;
`

const timeFrames = ['All Time', 'Last 30 Days', 'Last 14 Days', 'Last 7 Days']

function ProjectionsRow({ data }) {
    return (
        <Box direction="row" justify="between">
            {data.map(p => (
                <ProjectionElement direction="row" justify="evenly" align="center">
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img
                                src={statToIcon[p.category]}
                                width="100%"
                                height="100%"
                                alt="PPG"
                            />
                        </Box>
                    </IconWrapper>
                    <Box direction="column">
                        <div>{p.category}</div>
                        <Value>{p.value}</Value>
                    </Box>
                </ProjectionElement>
            ))}
        </Box>
    )
}

function WeeklyProjections({ showOpponent, myProjections, opponentsProjection }) {
    const [timeFrame, setTimeFrame] = useState(timeFrames[0])
    return (
        <ProjectionsContainer direction="column" justify={showOpponent ? 'evenly' : ''}>
            <Box direction="row" align="center">
                <ProjectionsHeader>Team Averages Per Stat</ProjectionsHeader>
                <DropdownContainer>
                    <Select
                        options={timeFrames}
                        value={timeFrame}
                        size="small"
                        onChange={setTimeFrame}
                    />
                </DropdownContainer>
            </Box>

            <Box gridArea="me" direction="row">
                <ProjectionsRow data={myProjections} />
            </Box>
            {showOpponent && (
                <>
                    <Box direction="row" justify="center">
                        <h1>Vs.</h1>
                    </Box>
                    <Box gridArea="opponent" direction="row">
                        <ProjectionsRow data={opponentsProjection} />
                    </Box>
                </>
            )}
        </ProjectionsContainer>
    )
}

export default WeeklyProjections
