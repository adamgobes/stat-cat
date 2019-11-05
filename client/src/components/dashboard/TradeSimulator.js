import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import { useQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import { SEARCH_PLAYERS_QUERY, DASHBOARD_QUERY, MY_TEAM_QUERY } from '../../apollo/queries'
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
    const [sentPlayers, setSentPlayers] = useState([])
    const [receivedPlayers, setReceivedPlayers] = useState([])
    const [postTradeTeam, setPostTradeTeam] = useState([])

    const { data: searchData, loading: searchLoading } = useQuery(SEARCH_PLAYERS_QUERY, {
        variables: { filter: playerInput },
        skip: playerInput.length < MIN_CHARS,
    })

    const { data: dashboardData, loading: dashboardLoading } = useQuery(DASHBOARD_QUERY)

    function onSendPlayer(player) {
        setSentPlayers([...sentPlayers, player])
    }

    function onReceivePlayer(player) {
        setReceivedPlayers([...receivedPlayers, player])
    }

    function onSimulateTrade() {
        const sentPlayersIds = sentPlayers.map(p => p.id)

        setPostTradeTeam([
            ...receivedPlayers,
            ...dashboardData.myTeam.players.filter(p => !sentPlayersIds.includes(p.id)),
        ])
    }

    if (dashboardLoading) return <Loader size="100" />

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
                    <Button onClick={onSimulateTrade}>Simulate</Button>
                </Box>
                <Box basis="large" align="center">
                    <MyStats
                        myPlayers={dashboardData.myTeam.players}
                        postTradePlayers={postTradeTeam}
                    />
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
