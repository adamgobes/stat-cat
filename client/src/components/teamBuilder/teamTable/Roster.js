import React from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'

import PlayerImage from '../../shared/PlayerImage'
import NoImagePlayer from '../../../assets/images/player.png'
import AddRemovePlayerButton from '../AddRemovePlayerButton'
import { ROSTER_SIZE } from '../TeamBuilderContext'
import Loader from '../../shared/Loader'
import { getFirstLastShortened, getPlayerImage } from '../../../apollo/dataSelectors'

const RosterWrapper = styled(Box)`
    background-color: #7781f7;
    border-radius: 10px;
    min-height: 100%;
    overflow-y: scroll;
`

const RosterGrid = styled(Box)`
    margin-top: 20px;
    width: 90%;
`

const MyTeamHeader = styled.h1`
    font-size: 2.6em;
    text-align: center;
    font-weight: bold;
    color: white;
    margin: 30px 0;
`

const MiniRosterImage = styled(Box)`
    position: relative;
`

const PlayerName = styled.h3`
    color: white;
    text-align: center;
    margin-top: 6px;
`

const RemovePlayerButton = styled(AddRemovePlayerButton)`
    position: absolute;
    margin-left: 38px;
    margin-top: -24px;
    background: white;
    border: 2px solid ${props => props.theme.global.colors.brand};
    color: #7781f7;
`

const SaveTeamButton = styled(Button)`
    width: 140px;
    border-radius: 20px;
    background: white;
    color: #7781f7;
    padding: 10px;
    text-align: center;
    border: 2px solid white;
`

const RosterItem = styled(Box)`
    flex-basis: 25%;
    min-height: 140px;
    @media (max-width: 1110px) {
        flex-basis: 33%;
        min-height: 130px;
    }
`

function Roster({ players, onRemovePlayer, onSaveTeam, saveTeamLoading }) {
    const team = [...players, ...new Array(ROSTER_SIZE - players.length)]

    return (
        <RosterWrapper align="center">
            <MyTeamHeader>My Team</MyTeamHeader>
            <RosterGrid>
                <Box direction="row" justify="start" wrap>
                    {team.map((p, i) => (
                        <RosterItem key={p ? p.id : i}>
                            <MiniRosterImage align="center" justify="center">
                                <PlayerImage
                                    size="M"
                                    src={p ? getPlayerImage(p) : NoImagePlayer}
                                    borderColor="white"
                                />
                                {p && (
                                    <RemovePlayerButton handleClick={() => onRemovePlayer(p)}>
                                        -
                                    </RemovePlayerButton>
                                )}
                            </MiniRosterImage>
                            {p && <PlayerName>{getFirstLastShortened(p)}</PlayerName>}
                        </RosterItem>
                    ))}
                </Box>
            </RosterGrid>
            <SaveTeamButton
                label={saveTeamLoading ? <Loader size={20} /> : <b>Save Team</b>}
                onClick={onSaveTeam}
            />
        </RosterWrapper>
    )
}

export default Roster
