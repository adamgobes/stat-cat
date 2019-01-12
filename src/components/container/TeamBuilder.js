import React, { Component } from 'react'
import styled from 'styled-components'
import base64 from 'base-64'
import axios from 'axios'

import AddPlayerInput from '../presentational/TeamBuilder/AddPlayerInput'
import TeamTable from '../presentational/TeamBuilder/TeamTable'

const Header = styled.h1`
    text-align: center;
    margin: 60px 0;
`

class TeamBuilder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playerInput: '',
            allPlayers: [],
            autocomplete: [],
            team: [],
        }
    }

    componentDidMount() {
        const username = 'adamgobes'
        const password = 'MYSPORTSFEEDS'
        const pass = base64.encode(`${username}:${password}`)
        const config = {
            headers: { Authorization: `Basic ${pass}` },
        }
        axios.get('https://api.mysportsfeeds.com/v2.0/pull/nba/players.json', config).then(res => this.setState({
                allPlayers: res.data.players.map(p => p.player),
            }))
    }

    onPlayerInputChange = (e) => {
        const val = e.target.value
        this.setState(prevState => ({
            playerInput: val,
            autocomplete: prevState.allPlayers
                .filter(
                    player => player.firstName.toLowerCase().startsWith(val.toLowerCase())
                        || player.lastName.toLowerCase().startsWith(val.toLowerCase()),
                )
                .map(player => `${player.firstName} ${player.lastName}`),
        }))
    }

    onAddPlayer = (playerName) => {
        const firstName = playerName.substring(0, playerName.indexOf(' '))
        const lastName = playerName.substring(playerName.indexOf(' ') + 1)

        const { allPlayers } = this.state

        const playerObject = allPlayers
            .filter(p => p.firstName === firstName && p.lastName === lastName)
            .map(p => ({
                fullName: `${p.firstName} ${p.lastName}`,
                currentTeam: p.currentTeam.abbreviation,
                id: p.id,
            }))[0]

        this.setState(prevState => ({
            team: [...prevState.team, playerObject],
            playerInput: '',
        }))
    }

    onPlayerSelect = (e) => {
        this.setState({
            playerInput: e.suggestion,
        })
    }

    render() {
        const { playerInput, autocomplete, team } = this.state

        return (
            <div>
                <Header>Team Builder</Header>
                <AddPlayerInput
                    autocomplete={autocomplete}
                    playerInput={playerInput}
					handleAddPlayer={this.onAddPlayer}
					handlePlayerInputChange={this.onPlayerInputChange}
					handlePlayerSelect={this.onPlayerSelect}
                />
                <TeamTable team={team} />
            </div>
        )
    }
}

export default TeamBuilder
