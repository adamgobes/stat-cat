import React, { Component } from 'react'
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Text,
    TextInput,
} from 'grommet'
import styled from 'styled-components'
import base64 from 'base-64'
import axios from 'axios'

const Header = styled.h1`
    text-align: center;
    margin: 60px 0;
`

const AddPlayerInput = styled(TextInput)`
    width: 300px;
    margin: 0 24px;
`

const COLUMNS = [
    {
        property: 'fullName',
        label: 'Name',
    },
    {
        property: 'currentTeam',
        label: 'Team',
    },
]

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

    handlePlayerInputChange = (e) => {
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
    };

    handleAddPlayer = (playerName) => {
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
    };

    handlePlayerSelect = (e) => {
        this.setState({
            playerInput: e.suggestion,
        })
    };

    render() {
        const { playerInput, autocomplete, team } = this.state

        return (
            <div>
                <Header>Team Builder</Header>
                <Box align="center">
                    <Box direction="row" width="medium">
                        <AddPlayerInput
                            size="large"
                            value={playerInput}
                            onChange={this.handlePlayerInputChange}
                            suggestions={autocomplete}
                            onSelect={this.handlePlayerSelect}
                        />
                        <Button label="Add" onClick={() => this.handleAddPlayer(playerInput)} />
                    </Box>
                </Box>
                <Box align="center" pad="large">
                    <Table caption="Your Team">
                        <TableHeader>
                            <TableRow>
                                {COLUMNS.map(c => (
                                    <TableCell key={c.property} scope="col">
                                        <Text>{c.label}</Text>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {team.map(player => (
                                <TableRow key={player.id}>
                                    {COLUMNS.map(c => (
                                        <TableCell key={c.property}>
                                            <Text>{player[c.property]}</Text>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        )
    }
}

export default TeamBuilder
