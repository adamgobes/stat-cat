import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'

import AddRemovePlayerButton from '../AddRemovePlayerButton'
import Loader from '../../shared/Loader'
import PlayerImage from '../../shared/PlayerImage'
import { getPlayerImage, getFullName } from '../../../apollo/dataSelectors'

const SuggestionsGridWrapper = styled(Box)`
    width: 80%;
    margin-top: 40px;
    overflow: scroll;
    padding: 20px;
`

const PlayerName = styled.h3`
    margin-top: -18px;
    text-align: center;
`

const AddPlayerButton = styled(AddRemovePlayerButton)`
    position: relative;
    left: 30px;
    bottom: 94px;
`

const SuggestionsGrid = ({ players, loading, onAddPlayer }) => (
    <SuggestionsGridWrapper width="large" justify={loading ? 'center' : 'stretch'}>
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
                        <PlayerImage src={getPlayerImage(p)} name={getFullName(p)} />
                        <AddPlayerButton handleClick={() => onAddPlayer(p)}>+</AddPlayerButton>
                        <PlayerName>{getFullName(p)}</PlayerName>
                    </Box>
                ))}
            </Grid>
        )}
    </SuggestionsGridWrapper>
)

export default SuggestionsGrid
