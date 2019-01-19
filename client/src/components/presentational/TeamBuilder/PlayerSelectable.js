import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grommet'

import NoImagePlayer from '../../../assets/images/player.png'
import AddRemovePlayerButton from '../shared/CircleButton'

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.global.colors.brand};
    overflow: hidden;
`

const PlayerName = styled.h3`
    margin-top: -18px;
    text-align: center;
`

const AddPlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    left: 40px;
	bottom: 94px;
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
                {player.imageSrc && (
                    <img src={player.imageSrc} height="80%" width="100%" alt={player.fullName} />
                )}
                {!player.imageSrc && (
                    <img src={NoImagePlayer} height="100%" width="100%" alt={player.fullName} />
                )}
            </Box>
        </ImageWrapper>
        <AddPlayerButton handleClick={() => handleAddPlayer(player)}>+</AddPlayerButton>
        <PlayerName>{player.fullName}</PlayerName>
    </Box>
)

export default withTheme(PlayerSelectable)
