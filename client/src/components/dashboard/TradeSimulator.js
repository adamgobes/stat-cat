import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import { SEARCH_PLAYERS_QUERY } from '../../apollo/queries'

const TradeSimulatorWrapper = styled(Box)`
    position: relative;
    background: #eff1f3;
    height: 100%;
    overflow: scroll;
`

export default function TradeSimulator() {
    const [playerInput, setPlayerInput] = useState('')

    const { data: searchData, loading: searchLoading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter: playerInput },
        skip: playerInput.length < MIN_CHARS,
    })

    return (
        <TradeSimulatorWrapper align="center" justify="start">
            <h1>Trade Simulator</h1>
            <Box direction="row" justify="center" align="start">
                <Box direction="column" justify="center" align="center">
                    <TradeSearch
                        searchValue={playerInput}
                        suggestions={
                            !searchLoading &&
                            playerInput.length >= MIN_CHARS &&
                            searchData.allPlayers
                        }
                        handleInputChange={e => setPlayerInput(e.target.value)}
                        loading={searchLoading}
                    />
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
