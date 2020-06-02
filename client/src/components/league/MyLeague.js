import React, { useContext } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'grommet'

import ConnectLeague from './ConnectLeague'
import { LEAGUE_INFO_QUERY } from '../../apollo/queries'
import { AppContext } from '../general/AppContext'
import Loader from '../shared/Loader'
import FallbackMessage from '../general/FallbackMessage'
import { NETWORK_ERROR_MESSAGE } from '../../utils/strings'

const MyLeagueWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

export default function MyLeague() {
    const {
        appContext: { selectedTeam },
    } = useContext(AppContext)

    const { data: leagueData, loading: leagueLoading, error: leagueError } = useQuery(
        LEAGUE_INFO_QUERY,
        {
            variables: { statCatTeamId: selectedTeam },
            fetchPolicy: 'cache-and-network',
        }
    )

    if (leagueLoading) return <Loader size={80} />

    if (leagueError) return <FallbackMessage message={NETWORK_ERROR_MESSAGE} showReload />

    console.log({ leagueData })

    return (
        <MyLeagueWrapper align="center" data-testid="myleague">
            {!leagueData && <ConnectLeague />}
            {!!leagueData && <h1>Some league info</h1>}
        </MyLeagueWrapper>
    )
}
