import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import CircleButton from '../shared/CircleButton'
import PlayerImage from '../shared/PlayerImage'

const PlayerContainer = styled(Box)`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
    padding: 12px;
    margin: 10px 0;
    min-width: 300px;
`

const ImageWrapper = styled(Box)`
    width: 80px;
    height: 60px;
`

const PlayerElement = styled(Box)`
    margin: 0 10px;
`

const RemovePlayerButton = styled(CircleButton)`
    cursor: pointer;
    position: absolute;
    right: 220px;
    font-size: 2em;
`

const TeamTable = ({ team, handleRemovePlayer }) => (
    <Box align="center" pad="large" style={{ marginTop: '-66px' }}>
        {team.map(player => (
            <PlayerContainer direction="row" align="center" key={player.id}>
                <ImageWrapper align="center" justify="center" className="container">
                    <PlayerImage
                        src={player.imageSrc}
                        name={player.fullName}
                        imageHeight="100%"
                        imageWidth="100%"
                        noImageHeight="100%"
                        noImageWidth="85%"
                    />
                </ImageWrapper>
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
