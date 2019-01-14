import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'

import PlayerSelectable from './PlayerSelectable'

const StyledBox = styled(Box)`
    margin-top: 20px;
    overflow: scroll;
`

const PlayersGrid = ({ autocomplete, onAddPlayer }) => (
    <StyledBox align="center">
        <Grid
            columns={{
                count: 3,
                size: 'auto',
            }}
            gap="small"
        >
            {autocomplete.slice(0, 20).map(
                p => <PlayerSelectable player={p} handleAddPlayer={onAddPlayer} key={p.id} />,
            )}
        </Grid>
    </StyledBox>
)

export default PlayersGrid
