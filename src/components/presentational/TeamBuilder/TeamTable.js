import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { SubtractCircle } from 'grommet-icons'

import NoImagePlayer from '../../../assets/images/player.png'

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

const TeamTable = ({ team, handleRemovePlayer }) => (
    <Box align="center" pad="large">
        {team.map(player => (
            <PlayerContainer align="center" direction="row" key={player.id}>
                <ImageWrapper align="center" justify="center" className="container">
                    {player.imageSrc && (
                        <img
                            src={player.imageSrc}
                            height="100%"
                            width="100%"
                            alt={player.fullName}
                        />
                    )}
                    {!player.imageSrc && (
                        <img src={NoImagePlayer} height="100%" width="100%" alt={player.fullName} />
                    )}
                </ImageWrapper>
                <PlayerElement>
                    <p>{player.fullName}</p>
                </PlayerElement>
				<PlayerElement style={{ cursor: 'pointer' }} onClick={() => handleRemovePlayer(player)}>
					<SubtractCircle />
				</PlayerElement>
            </PlayerContainer>
        ))}
    </Box>
)

export default TeamTable
