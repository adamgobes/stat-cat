import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import allPlayersRequest from '../../utils/sportsFeedAPI'
import AddPlayerInput from '../presentational/TeamBuilder/AddPlayerInput'
import TeamTable from '../presentational/TeamBuilder/TeamTable'

const Header = styled.h1`
    text-align: center;
    margin: 60px 0;
`

const TeamBuilder = () => {
    const [playerInput, setPlayerInput] = useState('')
    const [allPlayers, setAllPlayers] = useState([])
    const [autocomplete, setAutocomplete] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        allPlayersRequest().then(res => setAllPlayers(res.data.players.map(p => p.player)))
    })

    const onPlayerInputChange = (e) => {
        const val = e.target.value

        setPlayerInput(val)
        setAutocomplete(
            allPlayers
                .filter(
                    player => player.firstName.toLowerCase().startsWith(val.toLowerCase())
                        || player.lastName.toLowerCase().startsWith(val.toLowerCase()),
                )
                .map(player => `${player.firstName} ${player.lastName}`),
        )
    }

    const onAddPlayer = (playerName) => {
        const firstName = playerName.substring(0, playerName.indexOf(' '))
        const lastName = playerName.substring(playerName.indexOf(' ') + 1)

        const playerObject = allPlayers
            .filter(p => p.firstName === firstName && p.lastName === lastName)
            .map(p => ({
                fullName: `${p.firstName} ${p.lastName}`,
                currentTeam: p.currentTeam.abbreviation,
                id: p.id,
            }))[0]

        setTeam([...team, playerObject])
        setPlayerInput('')
        setAutocomplete([])
    }

    const onPlayerSelect = e => setPlayerInput(e.suggestion)

    return (
        <div>
            <Header>Team Builder</Header>
            <AddPlayerInput
                autocomplete={autocomplete}
                playerInput={playerInput}
                handleAddPlayer={onAddPlayer}
                handlePlayerInputChange={onPlayerInputChange}
                handlePlayerSelect={onPlayerSelect}
            />
            <TeamTable team={team} />
        </div>
    )
}

export default TeamBuilder
