import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';
import base64 from 'base-64';
import axios from 'axios';

class TeamBuilder extends Component {
    state = {
        playerInput: '',
		allPlayers: [],
		autocomplete: []
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

    handlePlayerInput = e => {
        this.setState({
            playerInput: e.target.value
        });
    };

    render() {
        return (
            <div>
                <h1>Let's Build Your Team</h1>
                <Box align="center">
                    <Box direction="row" width="medium">
                        <TextInput
                            size="large"
                            onChange={this.handlePlayerInput}
                        />
                        <Button label="Add" />
                    </Box>
                </Box>
            </div>
        );
    }
}

export default TeamBuilder;
