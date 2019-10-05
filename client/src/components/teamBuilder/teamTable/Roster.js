import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../../shared/PlayerImage'
import NoImagePlayer from '../../../assets/images/player.png'
import AddRemovePlayerButton from '../AddRemovePlayerButton'
import { ROSTER_SIZE } from '../TeamBuilderContext'

const RosterGrid = styled(Box)`
    margin-top: 20px;
    width: 90%;
`

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
    background: white;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: #7781f7;
`

const RosterItem = styled(Box)`
    flex-basis: 25%;
    min-height: 170px;
    @media (max-width: 1110px) {
        flex-basis: 33%;
        min-height: 146px;
    }
`

function Roster({ players, onRemovePlayer }) {
    const team = [...players, ...new Array(ROSTER_SIZE - players.length)]

    return (
        <>
            <MyTeamHeader>My Team</MyTeamHeader>
            <RosterGrid>
                <Box direction="row" justify="start" wrap>
                    {team.map((p, i) => (
                        <RosterItem key={p ? p.id : i}>
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
                </Box>
            </RosterGrid>
        </>
    )
}

export default Roster
