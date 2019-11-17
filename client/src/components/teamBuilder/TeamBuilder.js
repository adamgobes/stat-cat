import React, { useMemo, useContext } from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/react-hooks'
import Roster from './teamTable/Roster'
import Loader from '../shared/Loader'
import { SAVE_TEAM_MUTATION } from '../../apollo/mutations'
import { DASHBOARD_QUERY, MY_TEAM_QUERY, SEARCH_PLAYERS_QUERY } from '../../apollo/queries'
import {
    TeamBuilderContext,
    addPlayer,
    setWarningMessage,
    setPlayerInput,
    setTeam,
    removePlayer,
    MIN_CHARS,
    NOT_ENOUGH_CHARS_WARNING,
    DUP_PLAYER_WARNING,
} from './TeamBuilderContext'
import AddPlayerInput from './playerSearch/AddPlayerInput'
import SuggestionsGrid from './playerSearch/SuggestionsGrid'
import { ReactComponent as SearchPlaceholderGraphic } from '../../assets/images/undraw_search_placeholder.svg'

const Header = styled.h1`
    font-size: 2.6em;
    text-align: center;
    font-weight: bold;
    margin: 30px 0;
`

const WarningMessage = styled.h3`
    margin-top: 50px;
    text-align: center;
`

const SVGWrapper = styled(Box)`
    width: 260px;
    height: 260px;
    margin: ${props => props.margin}px;
`

function TeamBuilder({ history }) {
    const {
        teamBuilderContext: { playerInput, team, warningMessage },
        dispatch,
    } = useContext(TeamBuilderContext)

    const { data: myTeamData, loading: myTeamLoading } = useQuery(MY_TEAM_QUERY)

    const [mutateTeam, { loading: saveTeamLoading }] = useMutation(SAVE_TEAM_MUTATION, {
        refetchQueries: () => [{ query: DASHBOARD_QUERY }, { query: MY_TEAM_QUERY }],
        onCompleted: () => history.push('/dashboard'),
    })

    const { data: searchData, loading: searchLoading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter: playerInput },
        skip: playerInput.length < MIN_CHARS,
    })

    useMemo(() => {
        if (myTeamData && myTeamData.myTeam) {
            dispatch(setTeam(myTeamData.myTeam.players))
        }
    }, [myTeamData, dispatch])

    function handlePlayerInputChange(e) {
        const val = e.target.value

        if (!!val && val.length < MIN_CHARS) {
            dispatch(setWarningMessage(NOT_ENOUGH_CHARS_WARNING))
        } else {
            dispatch(setWarningMessage(''))
        }

        dispatch(setPlayerInput(val))
    }

    function handleSaveTeam() {
        mutateTeam({
            variables: { playerIds: team.map(p => p.id) },
        })
    }

    function handleAddPlayer(player) {
        if (team.map(p => p.id).includes(player.id)) {
            dispatch(setWarningMessage(DUP_PLAYER_WARNING))
        } else {
            dispatch(addPlayer(player))
        }
    }

    function handleRemovePlayer(player) {
        dispatch(removePlayer(player))
    }

    if (myTeamLoading) return <Loader size={80} />

    return (
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
            <Box direction="column" align="center">
                <Header>Team Builder</Header>
                <AddPlayerInput onPlayerInputChange={handlePlayerInputChange} value={playerInput} />
                {!warningMessage && playerInput.length === 0 && (
                    <SVGWrapper margin="40">
                        <SearchPlaceholderGraphic />
                    </SVGWrapper>
                )}
                {!!warningMessage && (
                    <>
                        <WarningMessage>{warningMessage}</WarningMessage>

                        {warningMessage === NOT_ENOUGH_CHARS_WARNING && (
                            <SVGWrapper margin="40">
                                <SearchPlaceholderGraphic />
                            </SVGWrapper>
                        )}
                    </>
                )}
                {playerInput.length >= MIN_CHARS && (
                    <SuggestionsGrid
                        players={!searchLoading && searchData.allPlayers}
                        loading={searchLoading}
                        onAddPlayer={handleAddPlayer}
                    />
                )}
            </Box>

            <Roster
                players={team}
                onRemovePlayer={handleRemovePlayer}
                onSaveTeam={handleSaveTeam}
                saveTeamLoading={saveTeamLoading}
            />
        </Grid>
    )
}

export default TeamBuilder
