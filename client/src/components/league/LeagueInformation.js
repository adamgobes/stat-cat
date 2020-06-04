import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Title, Subheader, Text } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'
import { DISCONNECT_ESPN_TEAM } from '../../apollo/mutations'
import { showAlert } from '../general/AppContext'
import { LEAGUE_INFO_QUERY } from '../../apollo/queries'

const LeagueInformationWrapper = styled(Box)`
    width: 90%;
    margin-top: 60px;
`

const Header = styled(Box)`
    width: 90%;
`

const LeagueName = styled(Title)`
    color: ${props => props.theme.global.colors.freeText};
`

const TeamInfoWrapper = styled(Box)`
    position: relative;
    margin-top: 24px;
    width: 68%;
    padding: 40px;
    background: white;
    border-radius: 12px;
`

const StyledSubheader = styled(Subheader)`
    color: black;
    font-size: 1.2em;
    margin: 8px 0px;
`

const TeamName = styled(Text)`
    color: black;
    font-size: 1em;
    margin: 8px 0px;
`

const DisconnectButton = styled(RoundedButton)`
    position: absolute;
    right: 20px;
    border-radius: 0px;
`

const OtherMembers = styled(Box)`
    margin-top: 20px;
    padding: 40px;
    background: white;
    width: 68%;
    border-radius: 12px;
`

const Member = styled(Box)`
    position: relative;
    width: 60%;
    background: white;
    border-radius: 6px;
    margin: 4px 0;
    min-height: 60px;
    padding: 6px;
    cursor: pointer;
    // box-shadow: rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px;
    // &:hover {
    //     opacity: 0.7;
    // }
`

const AvatarWrapper = styled(Box)`
    height: 100%;
    width: 20%;
`

const Avatar = styled(Box)`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 100%;
    background: ${props => props.background};
`

const MemberInformation = styled(Box)`
    height: 100%;
    width: 64%;
    color: black;
    margin-left: 10px;
`

const MemberName = styled(Title)`
    color: black;
    font-size: 0.8em;
    margin: -6px 0px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const MemberTeamName = styled(Subheader)`
    width: 100%;
    margin: 0px;
    font-size: 0.7em;
    color: #c3c5cd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default function LeagueInformation({ leagueData, myTeam, dispatch }) {
    const history = useHistory()

    const otherTeams = leagueData.teams.filter(team => team.id !== myTeam.id)

    const [disconnectTeam, { loading: disconnectLoading }] = useMutation(DISCONNECT_ESPN_TEAM, {
        variables: { leagueId: leagueData.espnId, statCatTeamId: myTeam.id },
        onCompleted: () => {
            dispatch(showAlert('Team Disconnected Successfully!', false))
            history.push('/app/league')
        },
        refetchQueries: [{ query: LEAGUE_INFO_QUERY, variables: { statCatTeamId: myTeam.id } }],
    })

    return (
        <LeagueInformationWrapper align="center">
            <Header direction="column" align="center">
                <LeagueName>{leagueData.name}</LeagueName>
            </Header>
            <TeamInfoWrapper>
                <StyledSubheader>Your Team</StyledSubheader>
                <TeamName>{myTeam.name}</TeamName>
                <DisconnectButton
                    width={180}
                    label="Disconnect Team"
                    onClick={disconnectTeam}
                    loading={disconnectLoading}
                />
            </TeamInfoWrapper>
            <OtherMembers>
                <StyledSubheader style={{ margin: '0 0 20px 0' }}>Other Members</StyledSubheader>
                {otherTeams.map(team => (
                    <Member direction="row" align="center" key={team.id}>
                        <AvatarWrapper direction="column" justify="center" align="center">
                            <Avatar size="40" align="center" justify="center" background="#7781f7">
                                <Text style={{ color: 'white', fontSize: '1em' }}>
                                    {team.owner.name.substring(0, 1)}
                                </Text>
                            </Avatar>
                        </AvatarWrapper>
                        <MemberInformation direction="column" justify="center">
                            <MemberName>{team.owner.name}</MemberName>
                            <MemberTeamName>{team.name}</MemberTeamName>
                        </MemberInformation>
                    </Member>
                ))}
            </OtherMembers>
        </LeagueInformationWrapper>
    )
}
