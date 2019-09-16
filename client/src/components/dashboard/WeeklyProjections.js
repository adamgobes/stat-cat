import React from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

const ProjectionElement = styled(Box)`
    width: 140px;
    height: 140px;
    background-color: white;
    margin: 0 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

function ProjectionsRow({ data }) {
    return (
        <Box direction="row" justify="between">
            {data.map(p => (
                <ProjectionElement direction="row" justify="evenly" align="center">
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '100%',
                            backgroundColor: 'red',
                        }}
                    />
                    <Box direction="column">
                        <div>{p.category}</div>
                        <div>{p.value}</div>
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
