import React, { useState } from 'react'
import { Box, Grid, Button } from 'grommet'
import styled from 'styled-components'
import gql from 'graphql-tag'

import { Mutation } from 'react-apollo'
import AddPlayerInput from '../presentational/TeamBuilder/AddPlayerInput'
import TeamTable from '../presentational/TeamBuilder/TeamTable'
import SuggestionsGrid from '../presentational/TeamBuilder/SuggestionsGrid'
import Logo from '../presentational/Logo'
import Nav from '../presentational/Nav'

const Header = styled.h2`
	text-align: center;
	margin: 40px 0;
`

const SaveButton = styled(Button)`
	background: white;
	color: ${props => props.theme.global.colors.brand};
	margin-top: 20px;
	border-radius: 0;
`

const SAVE_TEAM_MUTATION = gql`
	mutation saveTeamMutation($playerIds: [ID!]!) {
		saveTeam(playerIds: $playerIds) {
			players {
				fullName
			}
		}
	}
`

const TeamBuilder = () => {
	const [playerInput, setPlayerInput] = useState('')
	const [team, setTeam] = useState([])

	const onAddPlayer = player => {
		setTeam([...team, player])
	}

	const onRemovePlayer = player => {
		setTeam(team.filter(p => player.id !== p.id))
	}

	const onPlayerInputChange = e => {
		const val = e.target.value

		setPlayerInput(val)
	}

	// given players (stored in state) return array of their ids
	function extractIds(players) {
		return players.map(p => p.id)
	}

	function onTeamSave(data) {
		console.log(data)
	}

	return (
		<Box>
			<Nav showMenu showSignUp />
			<Grid
				fill
				areas={[
					{ name: 'search', start: [0, 0], end: [0, 0] },
					{ name: 'team', start: [1, 0], end: [1, 0] },
				]}
				columns={['1/2', 'flex']}
				rows={['flex']}
				gap="small"
			>
				<Box gridArea="search" style={{ borderRight: '1px solid black' }}>
					<Header>Team Builder</Header>
					<AddPlayerInput
						playerInput={playerInput}
						handleAddPlayer={onAddPlayer}
						handlePlayerInputChange={onPlayerInputChange}
					/>
					<SuggestionsGrid filter={playerInput} onAddPlayer={onAddPlayer} />
				</Box>
				<Box gridArea="team">
					<Header>Your Team</Header>
					{team.length !== 0 && (
						<TeamTable team={team} handleRemovePlayer={onRemovePlayer} />
					)}
					{team.length === 0 && (
						<Box align="center" pad="large" justify="center">
							<Logo />
							<h2>Add players using the form to the left!</h2>
						</Box>
					)}
				</Box>
			</Grid>
			<Box direction="row" justify="center">
				<Mutation
					mutation={SAVE_TEAM_MUTATION}
					variables={{ playerIds: extractIds(team) }}
					onCompleted={data => onTeamSave(data)}
				>
					{mutation => <SaveButton label="Save and proceed" onClick={mutation} />}
				</Mutation>
			</Box>
		</Box>
	)
}

export default TeamBuilder
