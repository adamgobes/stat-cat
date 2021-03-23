import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { Box, Layer } from 'grommet'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Title, Subheader, Text } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'
import { DISCONNECT_ESPN_TEAM } from '../../apollo/mutations'
import { showAlert } from '../general/AppContext'
import { LEAGUE_INFO_QUERY } from '../../apollo/queries'
import InviteMemberModal from './InviteMemberModal'

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

const MembersInfoWrapper = styled(Box)`
    width: 60%;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    overflow: hidden;
`
const MembersHeader = styled(Subheader)`
    color: black;
    padding: 20px;
    margin-left: 40px;
    font-size: 1.2em;
`

const SectionDivider = styled(Box)`
    background: #f7f8fa;
`

const SectionDividerHeader = styled(Subheader)`
    color: black;
    padding: 20px;
    margin-left: 40px;
`

const MemberSectionEntry = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: white;
    border: 1px solid #f7f8fa;
`

const MemberSectionEntryText = styled(Text)`
    padding: 20px;
    margin-left: 40px;
`

const InviteButton = styled(RoundedButton)`
    font-size: 0.9em;
    padding: 0px 10px;
    margin: 16px 0;
    margin-right: 20px;
`

const RemindButton = styled(RoundedButton)`
    font-size: 0.7em;
    padding: 0px 10px;
    margin: 12px 0;
`

export default function LeagueInformation({ leagueData, myTeam, dispatch }) {
    const history = useHistory()

    const otherTeams = leagueData.teams.filter(team => team.id !== myTeam.id)

    const [disconnectTeam, { loading: disconnectLoading }] = useMutation(DISCONNECT_ESPN_TEAM, {
        variables: { statCatTeamId: myTeam.id },
        onCompleted: () => {
            dispatch(showAlert('Team disconnected successfully!', false))
            history.push('/app/league')
        },
        refetchQueries: [{ query: LEAGUE_INFO_QUERY, variables: { statCatTeamId: myTeam.id } }],
    })

    const [showInviteModal, setShowInviteModal] = useState(false)

    return (
        <LeagueInformationWrapper align="center">
            <Header direction="column" align="start">
                <LeagueName>{leagueData.name}</LeagueName>
            </Header>
            <Box width="90%">
                <MembersInfoWrapper>
                    <Box direction="row" justify="between">
                        <MembersHeader>Members</MembersHeader>
                        <InviteButton
                            inverted
                            label="Invite Members"
                            onClick={() => setShowInviteModal(true)}
                        />
                    </Box>
                    <SectionDivider>
                        <SectionDividerHeader>Registered</SectionDividerHeader>
                        {leagueData.teams.map(t => (
                            <MemberSectionEntry>
                                <MemberSectionEntryText>{t.owner.email}</MemberSectionEntryText>
                            </MemberSectionEntry>
                        ))}
                    </SectionDivider>
                    <SectionDivider>
                        <SectionDividerHeader>Pending</SectionDividerHeader>
                        {leagueData.invitations.map(invitation => (
                            <MemberSectionEntry>
                                <MemberSectionEntryText>{invitation.email}</MemberSectionEntryText>
                                <Box direction="row" style={{ marginRight: '8px' }}>
                                    <MemberSectionEntryText style={{ fontWeight: 'bold' }}>
                                        sent{' '}
                                        {moment(parseInt(invitation.sentOn, 10)).format('MMM. Do')}
                                    </MemberSectionEntryText>
                                    <RemindButton label="Remind" sty />
                                </Box>
                            </MemberSectionEntry>
                        ))}
                    </SectionDivider>
                </MembersInfoWrapper>
            </Box>
            {showInviteModal && (
                <Layer
                    onEsc={() => setShowInviteModal(false)}
                    onClickOutside={() => setShowInviteModal(false)}
                >
                    <InviteMemberModal
                        closeModal={() => setShowInviteModal(false)}
                        leagueId={leagueData.espnId}
                        statCatTeamId={myTeam.id}
                    />
                </Layer>
            )}
        </LeagueInformationWrapper>
    )
}
