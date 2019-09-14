import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'
import { useQuery } from '@apollo/react-hooks'

import PlayerSelectable from './PlayerSelectable'
import { SEARCH_PLAYERS_QUERY } from '../../apollo/queries'
import Loader from '../shared/Loader'

const StyledBox = styled(Box)`
    margin-top: 40px;
    overflow: scroll;
`

const SuggestionsGrid = ({ filter, onAddPlayer }) => {
    const { data, loading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter },
    })

    if (loading) return <Loader size={50} />

    return (
        <StyledBox width="large">
            <Grid
                columns={{
                    count: 3,
                    size: 'auto',
                }}
                gap={{ row: 'medium', column: 'none' }}
            >
                {data.allPlayers.slice(0, 6).map(p => (
                    <PlayerSelectable key={p.id} player={p} handleAddPlayer={onAddPlayer} />
                ))}
            </Grid>
        </StyledBox>
    )
}

export default SuggestionsGrid
