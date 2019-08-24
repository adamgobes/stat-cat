import React, { useState, useMemo } from 'react'
import { Box, Grid, Button } from 'grommet'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/react-hooks'
import AddPlayerInput from './AddPlayerInput'
import TeamTable from './TeamTable'
import SuggestionsGrid from './SuggestionsGrid'
import Logo from '../general/Logo'
import Nav from '../general/Nav'
import Loader from '../shared/Loader'
import { SAVE_TEAM_MUTATION } from '../../apollo/mutations'
import { DASHBOARD_QUERY, MY_TEAM_QUERY } from '../../apollo/queries'

const Header = styled.h2`
    text-align: center;
    margin: 40px 0;
`

const SaveButton = styled(Button)`
    background: white;
    color: ${props => props.theme.global.colors.brand};
    margin-top: 20px;
    border-radius: 0;
`

function TeamBuilder() {
    const [playerInput, setPlayerInput] = useState('')
    const [team, setTeam] = useState([])

    const { data, loading: initLoading } = useQuery(MY_TEAM_QUERY)

    const [mutateTeam, { loading: saveTeamLoading }] = useMutation(SAVE_TEAM_MUTATION, {
        refetchQueries: () => [{ query: DASHBOARD_QUERY }],
    })

    useMemo(
        () => {
            if (data && data.myTeam) {
                setTeam(data.myTeam.players)
            }
        },
        [data]
    )

    function onAddPlayer(player) {
        setTeam([...team, player])
    }

    function onRemovePlayer(player) {
        setTeam(team.filter(p => player.id !== p.id))
    }

    function onPlayerInputChange(e) {
        const val = e.target.value

        setPlayerInput(val)
    }

    // given players, return array of their ids to persist to server
    function extractIds(playersArr) {
        return playersArr.map(p => p.id)
    }

    if (initLoading) return <Loader size={80} />

    return (
        <Box>
            <Nav showMenu showSignUp={false} />
            <Grid
                fill
                areas={[
                    { name: 'search', start: [0, 0], end: [0, 0] },
                    { name: 'team', start: [1, 0], end: [1, 0] },
                ]}
                columns={['1/2', 'flex']}
                rows={['flex']}
                gap="small"
            >
                <Box gridArea="search" style={{ borderRight: '1px solid black' }}>
                    <Header>Team Builder</Header>
                    <AddPlayerInput
                        playerInput={playerInput}
                        handleAddPlayer={onAddPlayer}
                        handlePlayerInputChange={onPlayerInputChange}
                    />
                    {playerInput && (
                        <SuggestionsGrid filter={playerInput} onAddPlayer={onAddPlayer} />
                    )}
                    {!playerInput && <div>type some shit</div>}
                </Box>
                <Box gridArea="team">
                    <Header>Your Team</Header>
                    {team.length !== 0 && (
                        <TeamTable team={team} handleRemovePlayer={onRemovePlayer} />
                    )}
                    {team.length === 0 && (
                        <Box align="center" pad="large" justify="center">
                            <Logo />
                            <h2>Add players using the form to the left!</h2>
                        </Box>
                    )}
                </Box>
            </Grid>
            <Box direction="row" justify="center">
                <SaveButton
                    label={saveTeamLoading ? <Loader size={20} /> : 'Save Team'}
                    onClick={() => {
                        mutateTeam({
                            variables: { playerIds: extractIds(team) },
                        })
                    }}
                />
            </Box>
        </Box>
    )
}

export default TeamBuilder
