import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import AddRemovePlayerButton from '../shared/CircleButton'
import PlayerImage from '../shared/PlayerImage'

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
        <PlayerImage src={player.imageSrc} name={player.fullName} />
        <AddPlayerButton handleClick={() => handleAddPlayer(player)}>+</AddPlayerButton>
        <PlayerName>{player.fullName}</PlayerName>
    </Box>
)

export default PlayerSelectable
