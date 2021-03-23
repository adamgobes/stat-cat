import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, TextInput } from 'grommet'
import { RoundedButton } from '../shared/Buttons'
import { Title } from '../shared/TextComponents'
import { INVITE_LEAGUE_MEMBER } from '../../apollo/mutations'
import { LEAGUE_INFO_QUERY } from '../../apollo/queries'

export default function InviteMemberModal({ leagueId, statCatTeamId, closeModal }) {
    console.log(leagueId)
    const [email, setEmail] = useState('')

    function handleInviteSent(data) {
        closeModal()
    }

    const [inviteMember, { data, loading }] = useMutation(INVITE_LEAGUE_MEMBER, {
        variables: { leagueId, email },
        onCompleted: handleInviteSent,
        refetchQueries: () => [{ query: LEAGUE_INFO_QUERY, variables: { statCatTeamId } }],
    })

    return (
        <Box pad="large">
            <Title>Invite member to league</Title>
            <Box pad="small">
                <TextInput
                    size="medium"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Box>
            <Box align="center">
                <RoundedButton
                    inverted
                    style={{ width: '100px' }}
                    onClick={() => inviteMember()}
                    loading={loading}
                    label="Invite"
                />
            </Box>
        </Box>
    )
}
