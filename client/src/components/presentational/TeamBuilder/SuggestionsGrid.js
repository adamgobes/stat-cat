import React from 'react'
import styled from 'styled-components'
import { Box, Grid } from 'grommet'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'

import PlayerSelectable from './PlayerSelectable'
import { ALL_PLAYERS_QUERY } from '../../../apollo/queries'
import { renderWhileLoading } from '../../helperComponents'

const StyledBox = styled(Box)`
	margin-top: 40px;
	overflow: scroll;
`

const SuggestionsGrid = ({ filter, onAddPlayer, data }) => (
	<StyledBox width="large">
		{!filter && <div>Type some shit</div>}
		{filter && (
			<Grid
				columns={{
					count: 3,
					size: 'auto',
				}}
				gap={{ row: 'medium', column: 'none' }}
			>
				{data.allPlayers.slice(0, 6).map(p => (
					<PlayerSelectable key={p.id} player={p} handleAddPlayer={onAddPlayer} />
				))}
			</Grid>
		)}
	</StyledBox>
)

export default compose(
	graphql(ALL_PLAYERS_QUERY),
	renderWhileLoading('data')
)(SuggestionsGrid)
