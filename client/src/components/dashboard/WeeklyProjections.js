import React from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import basketball from '../../assets/images/basketball.png'

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
    border: 1px solid;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.global.colors.brand};
    overflow: hidden;
`

const Value = styled.div`
    font-weight: bold;
    font-size: 1.2em;
`

function ProjectionsRow({ data }) {
    return (
        <Box direction="row" justify="between">
            {data.map(p => (
                <ProjectionElement direction="row" justify="evenly" align="center">
                    <IconWrapper>
                        <Box align="center" justify="center">
                            <img src={basketball} width="100%" height="100%" alt="PPG" />
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
    return (
        <Box direction="column" justify="between" align="center" style={{ height: '400px' }}>
            <Box gridArea="me" direction="row">
                <ProjectionsRow data={myProjections} />
            </Box>
            {showOpponent && (
                <>
                    <Box>
                        <h1>Vs.</h1>
                    </Box>
                    <Box gridArea="opponent" direction="row">
                        <ProjectionsRow data={opponentsProjection} />
                    </Box>
                </>
            )}
        </Box>
    )
}

export default WeeklyProjections
