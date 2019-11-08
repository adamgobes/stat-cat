import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import { SEARCH_PLAYERS_QUERY, DASHBOARD_QUERY, GET_PLAYER_STATS_QUERY } from '../../apollo/queries'
import SentAndReceived from './SentAndReceived'
import MyStats from './MyStats'
import Loader from '../shared/Loader'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'
import { ReactComponent as TradePlaceholderGraphic } from '../../assets/images/trade_placeholder.svg'

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
    margin-top: 12px;
`

const TradedPlayers = styled(Box)`
    margin-top: 236px;
    width: 100%;
`

const SVGWrapper = styled(Box)`
    width: 360px;
    height: 360px;
    margin: 100px 0 0 100px;
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

    const [
        getPlayerStats,
        { data: playerStatsData, loading: getPlayerStatsLoading },
    ] = useLazyQuery(GET_PLAYER_STATS_QUERY, {
        fetchPolicy: 'network-only',
    })

    useEffect(() => {
        if (playerStatsData && playerStatsData.getPlayerStats) {
            const sentPlayersIds = sentPlayers.map(p => p.id)

            setPostTradeTeam([
                ...dashboardData.myTeam.players.filter(p => !sentPlayersIds.includes(p.id)),
                ...playerStatsData.getPlayerStats,
            ])
        }
    }, [playerStatsData, dashboardData])

    const myTeamAverages = useMemo(() => {
        const averages =
            dashboardData &&
            computeTeamStatsAverages(dashboardData.myTeam.players.map(player => player.stats))
        return averages
    }, [dashboardData])

    const combinedStats = useMemo(() => {
        const postTradeAverages =
            postTradeTeam.length > 0 &&
            computeTeamStatsAverages(postTradeTeam.map(player => player.stats))
        const combinedAverages =
            postTradeTeam.length > 0 &&
            myTeamAverages.map((stat, i) => ({
                category: stat.category,
                values: [stat, postTradeAverages[i]].filter(e => !!e).map(s => s.value),
            }))
        return combinedAverages
    }, [postTradeTeam, myTeamAverages])

    function onSendPlayer(player) {
        setSentPlayers([...sentPlayers, player])
    }

    function onReceivePlayer(player) {
        setReceivedPlayers([...receivedPlayers, player])
    }

    function onRemoveSentPlayer(player) {
        setSentPlayers([...sentPlayers.filter(p => p.id !== player.id)])
    }

    function onRemoveReceivedPlayer(player) {
        setReceivedPlayers([...receivedPlayers.filter(p => p.id !== player.id)])
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
                    <TradedPlayers
                        direction="row"
                        justify="center"
                        style={{ marginTop: '236px', width: '100%' }}
                    >
                        <SentAndReceived
                            title="You Send"
                            players={sentPlayers}
                            onRemovePlayer={onRemoveSentPlayer}
                        />
                        <SentAndReceived
                            title="You Receive"
                            players={receivedPlayers}
                            onRemovePlayer={onRemoveReceivedPlayer}
                        />
                    </TradedPlayers>
                    <SimulateTradeButton
                        label={getPlayerStatsLoading ? <Loader size={20} /> : <b>Simulate Trade</b>}
                        onClick={onSimulateTrade}
                    />
                </Box>
                <Box basis="1/2" align="center">
                    {postTradeTeam.length > 0 && (
                        <MyStats
                            players={postTradeTeam}
                            averages={combinedStats}
                            isTradeSimulated
                        />
                    )}
                    {postTradeTeam.length === 0 && (
                        <SVGWrapper>
                            <TradePlaceholderGraphic />
                            <h2 style={{ textAlign: 'center' }}>Start searching and get trading</h2>
                        </SVGWrapper>
                    )}
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
