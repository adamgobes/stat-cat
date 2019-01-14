import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'

import PlayerSelectable from './PlayerSelectable'

const StyledBox = styled(Box)`
    margin-top: 40px;
    overflow: scroll;
`

const PlayersGrid = ({ autocomplete, onAddPlayer }) => (
    <StyledBox>
        <Grid
            columns={{
				count: 3,
				size: 'auto',
            }}
            gap="none"
        >
            {autocomplete.slice(0, 6).map(
                p => <PlayerSelectable player={p} handleAddPlayer={onAddPlayer} key={p.id} />,
            )}
        </Grid>
    </StyledBox>
)

export default PlayersGrid
