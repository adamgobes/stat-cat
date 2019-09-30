import React, { useContext } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import AddRemovePlayerButton from '../shared/CircleButton'
import PlayerImage from '../shared/PlayerImage'
import { TeamBuilderContext, setTeam, setWarningMessage } from './TeamBuilderContext'

const PlayerName = styled.h3`
    margin-top: -18px;
    text-align: center;
`

const AddPlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    left: 40px;
    bottom: 94px;
`

const PlayerSelectable = ({ player }) => {
    const {
        teamBuilderContext: { playerInput, team, warningMessage },
        dispatch,
    } = useContext(TeamBuilderContext)

    function handleAddPlayer(addedPlayer) {
        if (team.map(p => p.id).includes(addedPlayer.id)) {
            dispatch(setWarningMessage('Oops, looks like you already have that player!'))
        } else {
            dispatch(setTeam([...team, player]))
            dispatch(setWarningMessage(''))
        }
    }

    return (
        <Box direction="column" align="center">
            <PlayerImage src={player.imageSrc} name={player.fullName} />
            <AddPlayerButton handleClick={() => handleAddPlayer(player)}>+</AddPlayerButton>
            <PlayerName>{player.fullName}</PlayerName>
        </Box>
    )
}

export default PlayerSelectable
