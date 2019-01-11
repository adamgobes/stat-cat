import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';
import base64 from 'base-64';
import axios from 'axios';

class TeamBuilder extends Component {
    state = {
        playerInput: '',
        allPlayers: [],
		autocomplete: [],
		team: []
    };

    componentDidMount() {
        const username = 'adamgobes';
        const password = 'MYSPORTSFEEDS';
        const pass = base64.encode(`${username}:${password}`);
        const config = {
            headers: { Authorization: `Basic ${pass}` }
        };
        axios
            .get(
                'https://api.mysportsfeeds.com/v2.0/pull/nba/players.json',
                config
            )
            .then(res =>
                this.setState({
                    allPlayers: res.data.players.map(p => p.player),
                    isLoading: false
                })
            );
    }

    handlePlayerInputChange = e => {
        const val = e.target.value;
        this.setState({
            playerInput: val,
            autocomplete: this.state.allPlayers
                .filter(
                    player =>
                        player.firstName
                            .toLowerCase()
                            .startsWith(val.toLowerCase()) ||
                        player.lastName
                            .toLowerCase()
                            .startsWith(val.toLowerCase())
                )
                .map(player => `${player.firstName} ${player.lastName}`)
        });
	};

	handleAddPlayer = playerName => {
		const firstName = playerName.substring(0, playerName.indexOf(" "))
		const lastName = playerName.substring(playerName.indexOf(" ") + 1)

		const playerObject = this.state.allPlayers.filter(p => p.firstName === firstName && p.lastName === lastName)[0]

		this.setState(prevState => ({
			team: [...prevState.team, playerObject],
			playerInput: ''
		}))
	}
	
	handlePlayerSelect = e => {
		this.setState({
			playerInput: e.suggestion
		})
	}

    render() {
        return (
            <div>
                <h1>Let's Build Your Team</h1>
                <Box align="center">
                    <Box direction="row" width="medium">
                        <TextInput
							size="large"
							value={this.state.playerInput}
                            onChange={this.handlePlayerInputChange}
							suggestions={this.state.autocomplete}
							onSelect={this.handlePlayerSelect}
                        />
                        <Button label="Add" onClick={() => this.handleAddPlayer(this.state.playerInput)}/>
                    </Box>
                </Box>
				<Box>
					<ul>
						{this.state.team.map(player => (
							<li key={player.id}>{`${player.firstName} ${player.lastName}`}</li>
						))}
					</ul>
				</Box>
            </div>
        );
    }
}

export default TeamBuilder;
