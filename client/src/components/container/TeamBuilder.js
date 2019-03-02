import React, { useState } from 'react'
import { Box, Grid, Button } from 'grommet'
import styled from 'styled-components'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import AddPlayerInput from '../presentational/TeamBuilder/AddPlayerInput'
import TeamTable from '../presentational/TeamBuilder/TeamTable'
import SuggestionsGrid from '../presentational/TeamBuilder/SuggestionsGrid'
import Logo from '../presentational/Logo'
import Nav from '../presentational/Nav'
import { SAVE_TEAM_MUTATION } from '../../apollo/mutations'
import { DASHBOARD_QUERY, MY_TEAM_QUERY } from '../../apollo/queries'
import { renderWhileLoading, renderError } from '../helperComponents'

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

function TeamBuilder({ data: { myTeam }, mutateTeam }) {
	const { players } = myTeam

	const [playerInput, setPlayerInput] = useState('')
	const [team, setTeam] = useState([...players])

	function onAddPlayer(player) {
		setTeam([...team, player])
	}

	function onRemovePlayer(player) {
		setTeam(team.filter(p => player.id !== p.id))
	}

	function onPlayerInputChange(e) {
		const val = e.target.value

		setPlayerInput(val)
	}

	// given players, return array of their ids to persist to server
	function extractIds(playersArr) {
		return playersArr.map(p => p.id)
	}

	return (
		<Box>
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
					{playerInput && (
						<SuggestionsGrid filter={playerInput} onAddPlayer={onAddPlayer} />
					)}
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
				<SaveButton
					label="Save and proceed"
					onClick={() => {
						mutateTeam({
							variables: { playerIds: extractIds(team) },
							update: (cache, { data: { saveTeam } }) => {
								cache.writeQuery({ query: MY_TEAM_QUERY, data: saveTeam.players })
							},
						})
					}}
				/>
			</Box>
		</Box>
	)
}

export default compose(
	graphql(MY_TEAM_QUERY),
	graphql(SAVE_TEAM_MUTATION, {
		options: props => ({
			onCompleted: () => props.history.push('/'),
			refetchQueries: () => [{ query: DASHBOARD_QUERY }],
		}),
		name: 'mutateTeam',
	}),
	renderWhileLoading('data'),
	renderError('data')
)(TeamBuilder)
