import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import AddRemovePlayerButton from '../teamBuilder/AddRemovePlayerButton'
import { Subheader, Text } from '../general/TextComponents'

const ComponentWrapper = styled(Box)`
    min-height: 300px;
    width: 50%;
    background: white;
    margin: 10px 10px;
    border-radius: 10px;
`

const PlayerWrapper = styled(Box)`
    background: white;
    margin: 10px;
    border-radius: 10px;
`

const Truncated = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 6px;
    width: 60%;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    background: white;
    right: 10px;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: ${props => props.theme.global.colors.brand};
`

export default function SentAndReceived({ title, players, onRemovePlayer }) {
    return (
        <ComponentWrapper direction="column">
            <Subheader style={{ margin: '12px' }}>{title}</Subheader>
            {players.map(player => (
                <PlayerWrapper direction="row" align="center" key={player.id}>
                    <PlayerImage src={player.imageSrc} size="XS" />
                    <Truncated>
                        {`${player.firstName.substring(0, 1)}. ${player.lastName}`}
                    </Truncated>
                    <RemovePlayerButton handleClick={() => onRemovePlayer(player)}>
                        -
                    </RemovePlayerButton>
                </PlayerWrapper>
            ))}
        </ComponentWrapper>
    )
}
