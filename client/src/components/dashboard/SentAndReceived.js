import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import PlayerImage from '../shared/PlayerImage'

const PlayerWrapper = styled(Box)`
    background: white;
    margin: 10px 10px;
    padding: 10px;
    border-radius: 10px;
`

export default function SentAndReceived({ title, players }) {
    return (
        <Box direction="column">
            <h2>{title}</h2>
            {players.map(player => (
                <PlayerWrapper direction="row" align="center" basis="1/2">
                    <PlayerImage src={player.imageSrc} size="XS" />
                    <h3>{`${player.firstName.substring(0, 1)}. ${player.lastName}`}</h3>
                </PlayerWrapper>
            ))}
        </Box>
    )
}
