import React, { useMemo, useContext } from 'react'
import { Box, Button, Grid } from 'grommet'
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
} from './TeamBuilderContext'
import AddPlayerInput from './playerSearch/AddPlayerInput'
import SuggestionsGrid from './playerSearch/SuggestionsGrid'
import { ReactComponent as SearchPlaceholderGraphic } from '../../assets/images/undraw_search_placeholder.svg'
import { ReactComponent as NotEnoughCharsGraphic } from '../../assets/images/search_hint.svg'

const MIN_CHARS = 4
const NOT_ENOUGH_CHARS = `Psst... Type in at least ${MIN_CHARS} characters`

const Header = styled.h1`
    font-size: 2.6em;
    text-align: center;
    font-weight: bold;
    margin: 40px 0;
`

const RosterWrapper = styled(Box)`
    background-color: #7781f7;
    border-radius: 10px;
`

const SaveTeamButton = styled(Button)`
    width: 140px;
    border-radius: 10px;
    background: white;
    color: #7781f7;
    padding: 10px;
    text-align: center;
    border: 2px solid white;
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
        refetchQueries: () => [{ query: DASHBOARD_QUERY }],
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
            dispatch(setWarningMessage(NOT_ENOUGH_CHARS))
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

    function handleRemovePlayer(player) {
        dispatch(removePlayer(player))
    }

    // given players, return array of their ids to persist to server
    function extractIds(playersArr) {
        return playersArr.map(p => p.id)
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
                <AddPlayerInput
                    onPlayerInputChange={handlePlayerInputChange}
                    inputValue={playerInput}
                />
                {!warningMessage && playerInput.length === 0 && (
                    <SVGWrapper margin="40">
                        <SearchPlaceholderGraphic />
                    </SVGWrapper>
                )}
                {!!warningMessage && (
                    <>
                        <h3 style={{ marginTop: '50px', textAlign: 'center' }}>{warningMessage}</h3>

                        {warningMessage === NOT_ENOUGH_CHARS && (
                            <SVGWrapper margin="0">
                                <NotEnoughCharsGraphic />
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
            <RosterWrapper align="center">
                <Roster players={team} onRemovePlayer={handleRemovePlayer} />
                <SaveTeamButton
                    label={saveTeamLoading ? <Loader size={20} /> : 'Save Team'}
                    onClick={() => {
                        mutateTeam({
                            variables: { playerIds: extractIds(team) },
                        })
                    }}
                />
            </RosterWrapper>
        </Grid>
    )
}

export default TeamBuilder
