import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { AddCircle } from 'grommet-icons'

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
    border-radius: 100%;
    overflow: hidden;
`

const PlayerName = styled.h3`
    text-align: center;
`

const AddCircleButton = styled(Box)`
	position: relative;
	left: 56px;
	bottom: 94px;
	cursor: pointer;
`

const PlayerSelectable = ({ player, handleAddPlayer }) => (
    <Box direction="column" align="center">
        <ImageWrapper>
            <Box
                align="center"
                justify="center"
                className="container"
                style={{ marginTop: '10px' }}
            >
                <img src={player.imageSrc} height="80%" width="100%" alt={player.fullName} />
            </Box>
        </ImageWrapper>
        <AddCircleButton onClick={() => handleAddPlayer(player)}>
            <AddCircle />
        </AddCircleButton>
        <PlayerName>{player.fullName}</PlayerName>
    </Box>
)

export default PlayerSelectable
