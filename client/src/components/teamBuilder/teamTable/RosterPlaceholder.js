import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

const PlaceholderWrapper = styled(Box)`
    width: 260px;
    height: 150px;
    background: white;
    border-radius: 10px;
`

const ImageWrapper = styled(Box)`
    margin-right: 20px;
`

const FillerCircle = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background: #7781f7;
`

const FillerName = styled.div`
    width: 120px;
    height: 25px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerTeam = styled.div`
    width: 80px;
    height: 20px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerPosition = styled.div`
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background: #7781f7;
`

function RosterPlaceholder() {
    return (
        <PlaceholderWrapper direction="row" justify="evenly" align="center">
            <ImageWrapper>
                <FillerCircle />
            </ImageWrapper>
            <Box direction="column" justify="evenly" style={{ height: '80%' }}>
                <FillerName />
                <FillerTeam />
                <FillerPosition />
            </Box>
        </PlaceholderWrapper>
    )
}

export default RosterPlaceholder
