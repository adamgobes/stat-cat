import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../../shared/PlayerImage'

const hover = `
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px
		z-index: 1000;
	}
	transition: 0.5s;
`

const PlaceholderWrapper = styled(Box)`
    width: 260px;
    height: 150px;
    background: white;
    border-radius: 10px;
    ${props => (props.filled ? hover : '')}
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
    height: 20px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerTeam = styled.div`
    width: 80px;
    height: 15px;
    border-radius: 10px;
    background: #7781f7;
`

const FillerPosition = styled.div`
    width: 40px;
    height: 12px;
    border-radius: 10px;
    background: #7781f7;
`

const PlayerName = styled.div`
    font-size: 1.6em;
    font-weight: bold;
`

const PlayerTeam = styled.div`
    font-size: 1.2em;
`

const PlayerPosition = styled.div`
    font-size: 1.2em;
`

function RosterPlaceholder({ playerData }) {
    const filled = !!playerData
    const [isHovered, setIsHovered] = useState(false)

    return (
        <PlaceholderWrapper
            direction="row"
            justify="evenly"
            align="center"
            filled={filled}
            onMouseEnter={() => setIsHovered(!isHovered)}
            onMouseLeave={() => setIsHovered(!isHovered)}
        >
            <ImageWrapper>
                {!filled && <FillerCircle />}
                {filled && <PlayerImage size="S" src={playerData.imageSrc} />}
            </ImageWrapper>
            <Box direction="column" justify="evenly" style={{ height: '80%' }}>
                {!filled && (
                    <>
                        <FillerName />
                        <FillerTeam />
                        <FillerPosition />
                    </>
                )}
                {filled && (
                    <>
                        <PlayerName>{playerData.fullName}</PlayerName>
                        <PlayerTeam>{playerData.currentTeam.full}</PlayerTeam>
                        <PlayerPosition>{playerData.position}</PlayerPosition>
                    </>
                )}
            </Box>
        </PlaceholderWrapper>
    )
}

export default RosterPlaceholder
