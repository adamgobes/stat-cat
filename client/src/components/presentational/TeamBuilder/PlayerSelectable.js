import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import AddRemovePlayerButton from '../shared/CircleButton'
import PlayerImage from '../shared/PlayerImage'

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
				<PlayerImage
					src={player.imageSrc}
					name={player.fullName}
					imageHeight="80%"
					imageWidth="100%"
					noImageHeight="100%"
					noImageWidth="100%"
				/>
			</Box>
		</ImageWrapper>
		<AddPlayerButton handleClick={() => handleAddPlayer(player)}>+</AddPlayerButton>
		<PlayerName>{player.fullName}</PlayerName>
	</Box>
)

export default PlayerSelectable
