import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import AddRemovePlayerButton from '../teamBuilder/AddRemovePlayerButton'

const ComponentWrapper = styled(Box)`
    min-height: 300px;
    width: 50%;
    background: white;
    margin: 10px 10px;
    border-radius: 10px;
`

const PlayerWrapper = styled(Box)`
    background: white;
    margin: 2px 10px;
    padding: 10px;
    border-radius: 10px;
`

const Truncated = styled.h3`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 6px;
    width: 60%;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    background: white;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: #7781f7;
`

export default function SentAndReceived({ title, players, onRemovePlayer }) {
    return (
        <ComponentWrapper direction="column">
            <h2 style={{ margin: '12px' }}>{title}</h2>
            {players.map(player => (
                <PlayerWrapper direction="row" align="center" basis="1/2">
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
