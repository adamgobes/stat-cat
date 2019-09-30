import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'

import AddRemovePlayerButton from '../shared/CircleButton'
import Loader from '../shared/Loader'
import PlayerImage from '../shared/PlayerImage'

const StyledBox = styled(Box)`
    margin-top: 40px;
    overflow: scroll;
`

const PlayerName = styled.h3`
    margin-top: -18px;
    text-align: center;
`

const AddPlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    left: 40px;
    bottom: 94px;
`

const SuggestionsGrid = ({ players, loading, onAddPlayer }) => (
    <StyledBox width="large">
        {loading && <Loader size={50} />}
        {!loading && (
            <Grid
                columns={{
                    count: 3,
                    size: 'auto',
                }}
                gap={{ row: 'medium', column: 'none' }}
            >
                {players.slice(0, 6).map(p => (
                    <Box direction="column" align="center" key={p.id}>
                        <PlayerImage src={p.imageSrc} name={p.fullName} />
                        <AddPlayerButton handleClick={() => onAddPlayer(p)}>+</AddPlayerButton>
                        <PlayerName>{p.fullName}</PlayerName>
                    </Box>
                ))}
            </Grid>
        )}
    </StyledBox>
)

export default SuggestionsGrid
