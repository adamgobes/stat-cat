import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Box, TextInput } from 'grommet'
import { RoundedButton } from './Buttons'
import { Title } from './TextComponents'
import { CREATE_TEAM_MUTATION } from '../../apollo/mutations'
import { AppContext, setSelectedTeam } from '../general/AppContext'
import { ALL_MY_TEAMS_QUERY } from '../../apollo/queries'

export default function AddTeamModal({ closeModal, setTeam }) {
    const history = useHistory()
    const { dispatch } = useContext(AppContext)

    const [teamName, setTeamName] = useState('')

    function handleTeamCreated(data) {
        history.push('/app/teambuilder')

        dispatch(setSelectedTeam(data.addTeam.id))

        setTeam(data.addTeam)

        closeModal()
    }

    const [createTeam, { data, loading }] = useMutation(CREATE_TEAM_MUTATION, {
        variables: { name: teamName },
        onCompleted: handleTeamCreated,
        refetchQueries: () => [{ query: ALL_MY_TEAMS_QUERY }],
    })

    return (
        <Box pad="large">
            <Title>Add a New Team</Title>
            <Box pad="small">
                <TextInput
                    size="medium"
                    name="email"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                />
            </Box>
            <Box align="center">
                <RoundedButton
                    inverted
                    style={{ width: '100px' }}
                    onClick={() => createTeam()}
                    loading={loading}
                >
                    Create
                </RoundedButton>
            </Box>
        </Box>
    )
}
