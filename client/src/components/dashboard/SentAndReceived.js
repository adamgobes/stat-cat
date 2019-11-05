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

const ImagePlaceholder = styled(Box)`
    width: 30px;
    height: 30px;
    background: #7781f7;
    border-radius: 100%;
    margin-right: 10px;
`

const NamePlaceholder = styled(Box)`
    width: 100px;
    height: 20px;
    background: #7781f7;
    border-radius: 10px;
`

export default function SentAndReceived({ title, players }) {
    return (
        <Box direction="column">
            <h2>{title}</h2>
            {players.map(player => (
                <PlayerWrapper direction="row" align="center" basis="1/2">
                    {!!player && (
                        <>
                            <PlayerImage src={player.imageSrc} size="XS" />
                            <h3>{`${player.firstName.substring(0, 1)}. ${player.lastName}`}</h3>
                        </>
                    )}
                    {!player && (
                        <>
                            <ImagePlaceholder />
                            <NamePlaceholder />
                        </>
                    )}
                </PlayerWrapper>
            ))}
        </Box>
    )
}
