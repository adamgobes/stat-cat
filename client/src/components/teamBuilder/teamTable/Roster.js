import React from 'react'
import styled from 'styled-components'
import { Box, Grid, Button } from 'grommet'
import PlayerImage from '../../shared/PlayerImage'
import NoImagePlayer from '../../../assets/images/player.png'
import AddRemovePlayerButton from '../AddRemovePlayerButton'

const MyTeamHeader = styled.h1`
    font-size: 2.6em;
    text-align: center;
    font-weight: bold;
    color: white;
    margin: 40px 0;
`

const MiniRosterImage = styled(Box)``

const PlayerName = styled.h3`
    color: white;
    text-align: center;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
	position: relative;
	left: 82px;
	bottom: 140px;
	visibility: ${props => (props.hidden ? 'hidden' : 'visible')}
    background: white;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: #7781f7;
`

const ROSTER_SIZE = 12

function Roster({ players, onRemovePlayer }) {
    const team = [...players, ...new Array(ROSTER_SIZE - players.length)]

    return (
        <>
            <MyTeamHeader>My Team</MyTeamHeader>
            <Grid
                columns={{
                    count: 4,
                    size: 'auto',
                }}
                gap={{ row: 'small', column: 'medium' }}
                style={{ marginTop: '20px' }}
            >
                {team.map(p => (
                    <Box style={{ minHeight: '170px', minWidth: '130px' }}>
                        <MiniRosterImage align="center" justify="center">
                            <PlayerImage
                                size="M"
                                src={p ? p.imageSrc : NoImagePlayer}
                                borderColor="white"
                            />
                        </MiniRosterImage>
                        {p && (
                            <PlayerName>
                                {`${p.firstName.substring(0, 1)}. ${p.lastName}`}
                            </PlayerName>
                        )}
                        {p && (
                            <RemovePlayerButton handleClick={() => onRemovePlayer(p)}>
                                -
                            </RemovePlayerButton>
                        )}
                    </Box>
                ))}
            </Grid>
        </>
    )
}

export default Roster
