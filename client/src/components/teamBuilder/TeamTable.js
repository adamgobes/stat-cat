import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import AddRemovePlayerButton from './AddRemovePlayerButton'
import PlayerImage from '../shared/PlayerImage'

const PlayerContainer = styled(Box)`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
    padding: 12px;
    margin: 10px 0;
    min-width: 300px;
`

const PlayerElement = styled(Box)`
    margin: 0 10px;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
    cursor: pointer;
    position: absolute;
    right: 220px;
    font-size: 2em;
`

const TeamTable = ({ team, handleRemovePlayer }) => (
    <Box align="center" pad="large" style={{ marginTop: '-66px' }}>
        {team.map(player => (
            <PlayerContainer direction="row" align="center" key={player.id}>
                <PlayerImage src={player.imageSrc} name={player.fullName} size="S" />
                <PlayerElement>
                    <p>{player.fullName}</p>
                </PlayerElement>
                <RemovePlayerButton handleClick={() => handleRemovePlayer(player)}>
                    {`-`}
                </RemovePlayerButton>
            </PlayerContainer>
        ))}
    </Box>
)

export default TeamTable
