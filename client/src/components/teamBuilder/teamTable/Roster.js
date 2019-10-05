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

const MiniRosterImage = styled(Box)`
    position: relative;
`

const PlayerName = styled.h3`
    color: white;
    text-align: center;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
	position: absolute;
	margin-left: 38px;
	margin-top: -24px;
	visibility: ${props => (props.hidden ? 'hidden' : 'visible')}
    background: white;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: #7781f7;
`

const Row = styled(Box)``

const RosterItem = styled(Box)``

const ROSTER_SIZE = 12

function Roster({ players, onRemovePlayer }) {
    const team = [...players, ...new Array(ROSTER_SIZE - players.length)]

    return (
        <>
            <MyTeamHeader>My Team</MyTeamHeader>
            <Box style={{ marginTop: '20px', width: '90%' }}>
                <Row direction="row" justify="start" wrap>
                    {team.map(p => (
                        <RosterItem style={{ minHeight: '170px' }} basis="1/4">
                            <MiniRosterImage align="center" justify="center">
                                <PlayerImage
                                    size="M"
                                    src={p ? p.imageSrc : NoImagePlayer}
                                    borderColor="white"
                                />
                                {p && (
                                    <RemovePlayerButton handleClick={() => onRemovePlayer(p)}>
                                        -
                                    </RemovePlayerButton>
                                )}
                            </MiniRosterImage>
                            {p && (
                                <PlayerName>
                                    {`${p.firstName.substring(0, 1)}. ${p.lastName}`}
                                </PlayerName>
                            )}
                        </RosterItem>
                    ))}
                </Row>
            </Box>
        </>
    )
}

export default Roster
