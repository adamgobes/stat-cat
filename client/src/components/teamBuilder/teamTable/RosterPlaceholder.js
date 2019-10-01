import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

const PlaceholderWrapper = styled(Box)`
    width: 400px;
    height: 150px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const ImageWrapper = styled(Box)`
    margin-right: 20px;
`

const FillerCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100%;
    background: #7781f7;
`

const FillerName = styled.div`
    width: 150px;
    height: 25px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerTeam = styled.div`
    width: 100px;
    height: 20px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerPosition = styled.div`
    width: 60px;
    height: 20px;
    border-radius: 10px;
    background: #7781f7;
`

function RosterPlaceholder() {
    return (
        <div style={{ width: '100%', height: '100%', background: '#FAFAFA' }}>
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
        </div>
    )
}

export default RosterPlaceholder
