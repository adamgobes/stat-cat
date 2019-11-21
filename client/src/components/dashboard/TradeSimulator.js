import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import TradeSearch from './TradeSearch'
import { MIN_CHARS } from '../teamBuilder/TeamBuilderContext'
import {
    SEARCH_PLAYERS_QUERY,
    DASHBOARD_QUERY,
    GET_PLAYER_STATS_QUERY,
    MY_STATS_QUERY,
} from '../../apollo/queries'
import SentAndReceived from './SentAndReceived'
import MyStats from './MyStats'
import Loader from '../shared/Loader'
import { computeTeamStatsAverages } from '../../utils/computeHelpers'

export const MAX_PLAYERS_TRADED = 4

const TradeSimulatorWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

const SimulateTradeButton = styled(Button)`
    width: 140px;
    border-radius: 20px;
    background: white;
    color: ${props => props.theme.global.colors.brand};
    padding: 10px;
    text-align: center;
    margin-top: 12px;
`

const TradedPlayers = styled(Box)`
	margin-top: 28px
    width: 100%;
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

    const { data: currentStatsData, loading: statsLoading } = useQuery(MY_STATS_QUERY)

    function onGetPlayerStatsCompleted(data) {
        const sentPlayersIds = sentPlayers.map(p => p.id)

        setPostTradeTeam([
            ...currentStatsData.myTeam.players.filter(p => !sentPlayersIds.includes(p.id)),
            ...data.getPlayerStats,
        ])
    }

    const [getPlayerStats, { loading: getPlayerStatsLoading }] = useLazyQuery(
        GET_PLAYER_STATS_QUERY,
        {
            fetchPolicy: 'network-only',
            onCompleted: onGetPlayerStatsCompleted,
        }
    )

    const myTeamAverages = useMemo(() => {
        const averages =
            currentStatsData &&
            computeTeamStatsAverages(
                currentStatsData.myTeam.players.map(player => player.stats)
            ).map(stat => ({
                category: stat.category,
                values: [stat.value],
            }))
        return averages
    }, [currentStatsData])

    const combinedStats = useMemo(() => {
        const postTradeAverages =
            postTradeTeam.length > 0 &&
            computeTeamStatsAverages(postTradeTeam.map(player => player.stats))
        const combinedAverages =
            postTradeTeam.length > 0 &&
            myTeamAverages.map((stat, i) => ({
                category: stat.category,
                values: [stat.values[0], postTradeAverages[i].value].filter(e => !!e),
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

    if (statsLoading) return <Loader size="100" />

    return (
        <TradeSimulatorWrapper align="center">
            <h1>Trade Simulator</h1>
            <Box direction="row" align="center" style={{ width: '90%' }}>
                <Box direction="column" justify="center" align="center" basis="1/2">
                    <h2 style={{ textAlign: 'center' }}>Start searching and get trading</h2>
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
                        sendablePlayers={currentStatsData.myTeam.players.map(p => p.id)}
                    />
                    <TradedPlayers direction="row" justify="center">
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
                    <MyStats
                        players={
                            postTradeTeam.length === 0
                                ? currentStatsData.myTeam.players
                                : postTradeTeam
                        }
                        averages={postTradeTeam.length === 0 ? myTeamAverages : combinedStats}
                        isTradeSimulated={postTradeTeam.length > 0}
                        timeFrames={{
                            showTimeFrames: false,
                        }}
                    />
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
