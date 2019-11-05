import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import { SEARCH_PLAYERS_QUERY, DASHBOARD_QUERY } from '../../apollo/queries'
import SentAndReceived from './SentAndReceived'
import MyStats from './MyStats'
import Loader from '../shared/Loader'

export const MAX_PLAYERS_TRADED = 4

const TradeSimulatorWrapper = styled(Box)`
    position: relative;
    background: #eff1f3;
    height: 100%;
    overflow: scroll;
`

export default function TradeSimulator() {
    const [playerInput, setPlayerInput] = useState('')
    const [sentPlayers, setSentPlayers] = useState(new Array(MAX_PLAYERS_TRADED).fill(0))
    const [receivedPlayers, setReceivedPlayers] = useState(new Array(MAX_PLAYERS_TRADED).fill(0))

    const { data: searchData, loading: searchLoading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter: playerInput },
        skip: playerInput.length < MIN_CHARS,
    })

    const { data: dashboardData, loading: dashboardLoading } = useQuery(DASHBOARD_QUERY)

    function onSendPlayer(player) {
        const firstEmpty = sentPlayers.indexOf(0)

        if (firstEmpty === -1) return

        setSentPlayers(sentPlayers.map((p, i) => (i === firstEmpty ? player : p)))
    }

    function onReceivePlayer(player) {
        setReceivedPlayers([...receivedPlayers, player])
    }

    return (
        <TradeSimulatorWrapper align="center">
            <h1>Trade Simulator</h1>
            <Box direction="row" align="start" style={{ width: '90%' }}>
                <Box direction="column" justify="center" align="center" basis="medium">
                    <TradeSearch
                        searchValue={playerInput}
                        suggestions={
                            !searchLoading &&
                            playerInput.length >= MIN_CHARS &&
                            searchData.allPlayers
                        }
                        handleInputChange={e => setPlayerInput(e.target.value)}
                        loading={searchLoading}
                        onSendPlayer={onSendPlayer}
                        onReceivePlayer={onReceivePlayer}
                    />
                </Box>
                <Box direction="column" justify="center" basis="small">
                    <SentAndReceived title="You Send" players={sentPlayers} basis="1/2" />
                    <SentAndReceived title="You Receive" players={receivedPlayers} basis="1/2" />
                </Box>
                <Box basis="large" align="center">
                    {dashboardLoading && <Loader size="50" />}
                    {!dashboardLoading && (
                        <MyStats
                            playerStats={dashboardData.myTeam.players}
                            postTradeStats={dashboardData.myTeam.players}
                        />
                    )}
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
