import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'
import { useQuery } from '@apollo/react-hooks'

import PlayerSelectable from './PlayerSelectable'
import { ALL_PLAYERS_QUERY } from '../../apollo/queries'

const StyledBox = styled(Box)`
    margin-top: 40px;
    overflow: scroll;
`

const SuggestionsGrid = ({ filter, onAddPlayer }) => {
    const { data, loading } = useQuery(ALL_PLAYERS_QUERY, {
        variables: { filter },
    })

    if (loading) return <div>loading</div>

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
