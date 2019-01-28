import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import PlayerSelectable from './PlayerSelectable'

const StyledBox = styled(Box)`
	margin-top: 40px;
	overflow: scroll;
`
const ALL_PLAYERS_QUERY = gql`
	query allPlayersQuery($filter: String) {
		allPlayers(filter: $filter) {
			id
			fullName
			imageSrc
		}
	}
`

const SuggestionsGrid = ({ filter, onAddPlayer }) => (
	<StyledBox width="large">
		{!filter && <div>Type some shit</div>}
		{filter && (
			<Query query={ALL_PLAYERS_QUERY} variables={{ filter }}>
				{({ loading, error, data }) => {
					if (loading) return <div>loading</div>

					return (
						<Grid
							columns={{
								count: 3,
								size: 'auto',
							}}
							gap={{ row: 'medium', column: 'none' }}
						>
							{data.allPlayers.slice(0, 6).map(p => (
								<PlayerSelectable
									key={p.id}
									player={p}
									handleAddPlayer={onAddPlayer}
								/>
							))}
						</Grid>
					)
				}}
			</Query>
		)}
	</StyledBox>
)

export default SuggestionsGrid
