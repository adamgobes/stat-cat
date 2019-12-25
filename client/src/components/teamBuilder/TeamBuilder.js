import React, { useMemo, useContext } from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import { useQuery, useMutation } from '@apollo/react-hooks'
import Roster from './teamTable/Roster'
import Loader from '../shared/Loader'
import { SAVE_TEAM_MUTATION } from '../../apollo/mutations'
import {
    MY_TEAM_QUERY,
    SEARCH_PLAYERS_QUERY,
    WEEKLY_OVERVIEW_QUERY,
    MY_STATS_QUERY,
} from '../../apollo/queries'
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
import FallbackMessage from '../general/FallbackMessage'
import { Title, Subheader } from '../shared/TextComponents'
import { NETWORK_ERROR_MESSAGE } from '../../utils/strings'
import { AppContext } from '../general/AppContext'

const Header = styled(Title)`
    text-align: center;
    font-weight: bold;
    margin: 70px 0 74px 0;
`

const WarningMessage = styled(Subheader)`
    color: black;
    margin-top: 50px;
    text-align: center;
    font-weight: normal;
`

const SVGWrapper = styled(Box)`
    width: 260px;
    height: 260px;
    margin: ${props => props.margin}px;
`

function TeamBuilder({ history }) {
    const {
        appContext: { selectedTeam },
    } = useContext(AppContext)

    const {
        teamBuilderContext: { playerInput, team, warningMessage },
        dispatch,
    } = useContext(TeamBuilderContext)

    const { data: myTeamData, loading: myTeamLoading, error: myTeamError } = useQuery(
        MY_TEAM_QUERY,
        {
            variables: { teamId: selectedTeam },
        }
    )

    const [mutateTeam, { loading: saveTeamLoading }] = useMutation(SAVE_TEAM_MUTATION, {
        refetchQueries: () => [
            { query: WEEKLY_OVERVIEW_QUERY },
            { query: MY_STATS_QUERY, variables: { timeFrame: 'All' } },
        ],
        awaitRefetchQueries: true,
        onCompleted: () => history.push('/app/dashboard'),
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
            variables: { playerIds: team.map(p => p.id), teamId: selectedTeam },
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

    if (myTeamError) return <FallbackMessage message={NETWORK_ERROR_MESSAGE} showReload />

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

                        {!warningMessage && (
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
