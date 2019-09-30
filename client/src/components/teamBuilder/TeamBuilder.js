import React, { useMemo, useContext } from 'react'
import { Box, Grid, Button } from 'grommet'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/react-hooks'
import TeamTable from './TeamTable'
import Logo from '../general/Logo'
import Loader from '../shared/Loader'
import { SAVE_TEAM_MUTATION } from '../../apollo/mutations'
import { DASHBOARD_QUERY, MY_TEAM_QUERY, SEARCH_PLAYERS_QUERY } from '../../apollo/queries'
import {
    TeamBuilderContext,
    addPlayer,
    setWarningMessage,
    setPlayerInput,
    removePlayer,
    setTeam,
} from './TeamBuilderContext'
import AddPlayerInput from './playerSearch/AddPlayerInput'
import SuggestionsGrid from './playerSearch/SuggestionsGrid'

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
    const {
        teamBuilderContext: { playerInput, team, warningMessage },
        dispatch,
    } = useContext(TeamBuilderContext)

    const { data: myTeamData, loading: myTeamLoading } = useQuery(MY_TEAM_QUERY)

    const [mutateTeam, { loading: saveTeamLoading }] = useMutation(SAVE_TEAM_MUTATION, {
        refetchQueries: () => [{ query: DASHBOARD_QUERY }],
    })

    const { data: searchData, loading: searchLoading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter: playerInput },
        skip: playerInput.length < 3,
    })

    useMemo(() => {
        if (myTeamData && myTeamData.myTeam) {
            dispatch(setTeam(myTeamData.myTeam.players))
        }
    }, [myTeamData, dispatch])

    function handlePlayerInputChange(e) {
        const val = e.target.value

        if (!!val && val.length < 3) {
            dispatch(setWarningMessage('Psst... Type in at least 3 characters'))
        } else {
            dispatch(setWarningMessage(''))
        }

        dispatch(setPlayerInput(val))
    }

    function handleAddPlayer(player) {
        if (team.map(p => p.id).includes(player.id)) {
            dispatch(setWarningMessage('Oops, looks like you already have that player!'))
        } else {
            dispatch(addPlayer(player))
        }
    }

    function onRemovePlayer(player) {
        removePlayer(player)
    }

    // given players, return array of their ids to persist to server
    function extractIds(playersArr) {
        return playersArr.map(p => p.id)
    }

    if (myTeamLoading) return <Loader size={80} />

    return (
        <Box>
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
                <Box gridArea="search">
                    <Header>Team Builder</Header>
                    <AddPlayerInput
                        onPlayerInputChange={handlePlayerInputChange}
                        inputValue={playerInput}
                    />
                    {!!warningMessage && (
                        <h3 style={{ marginTop: '50px', textAlign: 'center' }}>{warningMessage}</h3>
                    )}
                    {playerInput.length >= 3 && (
                        <SuggestionsGrid
                            players={!searchLoading && searchData.allPlayers}
                            loading={searchLoading}
                            onAddPlayer={handleAddPlayer}
                        />
                    )}
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
