import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import { SEARCH_PLAYERS_QUERY, DASHBOARD_QUERY, GET_PLAYER_STATS_QUERY } from '../../apollo/queries'
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

const SimulateTradeButton = styled(Button)`
    width: 140px;
    border-radius: 20px;
    background: white;
    color: #7781f7;
    padding: 10px;
    text-align: center;
    border: 2px solid white;
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

    const [getPlayerStats, { data: playerStatsData }] = useLazyQuery(GET_PLAYER_STATS_QUERY)

    useEffect(() => {
        if (playerStatsData && playerStatsData.getPlayerStats) {
            const sentPlayersIds = sentPlayers.map(p => p.id)

            setPostTradeTeam([
                ...dashboardData.myTeam.players.filter(p => !sentPlayersIds.includes(p.id)),
                ...playerStatsData.getPlayerStats,
            ])
        }
    }, [playerStatsData])

    function onSendPlayer(player) {
        setSentPlayers([...sentPlayers, player])
    }

    function onReceivePlayer(player) {
        setReceivedPlayers([...receivedPlayers, player])
    }

    function onSimulateTrade() {
        getPlayerStats({ variables: { playerIds: receivedPlayers.map(p => p.id) } })
    }

    if (dashboardLoading) return <Loader size="100" />

    return (
        <TradeSimulatorWrapper align="center">
            <h1>Trade Simulator</h1>
            <Box direction="row" align="start" style={{ width: '90%' }}>
                <Box direction="column" justify="center" align="center" basis="1/2">
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
                    <Box
                        direction="row"
                        justify="center"
                        style={{ marginTop: '236px', width: '100%' }}
                    >
                        <SentAndReceived title="You Send" players={sentPlayers} />
                        <SentAndReceived title="You Receive" players={receivedPlayers} />
                        <SimulateTradeButton onClick={onSimulateTrade}>
                            Simulate
                        </SimulateTradeButton>
                    </Box>
                </Box>
                <Box basis="1/2" align="center">
                    <MyStats
                        myPlayers={dashboardData.myTeam.players}
                        postTradePlayers={postTradeTeam}
                    />
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
