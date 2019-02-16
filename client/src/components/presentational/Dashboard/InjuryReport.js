import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { INJURIES_QUERY } from '../../../apollo/queries'

const InjuryReport = ({ injuriesData }) => {
	const { players } = injuriesData.myTeam
	return players.map(
		player =>
			player.injury && (
				<div key={player.id}>{`${player.fullName} - ${player.injury.description}`}</div>
			)
	)
}

export default compose(
	graphql(INJURIES_QUERY, {
		options: props => ({
			fetchPolicy: 'network-only',
		}),
		name: 'injuriesData',
	}),
	branch(props => props.injuriesData.loading, renderComponent(() => <div>loading</div>))
)(InjuryReport)
