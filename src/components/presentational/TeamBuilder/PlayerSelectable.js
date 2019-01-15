import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grommet'

import NoImagePlayer from '../../../assets/images/player.png'

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

const AddCircleButton = styled(Box)`
    position: relative;
    left: 40px;
    bottom: 94px;
	cursor: pointer;

	width: 26px;
    height: 26px;
    border-radius: 100%;
	background: ${props => props.theme.global.colors.brand};
	font-weight: bold;
	color: white;
	font-size: 1.6em;
	&:hover {
		background: white;
		color: ${props => props.theme.global.colors.brand};
		transition: 0.2s ease;
		border: 1px solid ${props => props.theme.global.colors.brand};
	}
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
        <AddCircleButton direction="column" align="center" justify="center" className="container" onClick={() => handleAddPlayer(player)}>
            <div style={{ margin: '0 0 2px 1px' }}>+</div>
        </AddCircleButton>
        <PlayerName>{player.fullName}</PlayerName>
    </Box>
)

export default withTheme(PlayerSelectable)
