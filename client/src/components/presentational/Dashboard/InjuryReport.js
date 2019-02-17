import React from 'react'
import { Box } from 'grommet'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'
import { INJURIES_QUERY } from '../../../apollo/queries'

const InjuryReport = ({ injuriesData }) => {
	const { players } = injuriesData
	return players.map(
		player =>
			player.injury && (
				<div key={player.id}>{`${player.fullName} - ${player.injury.description}`}</div>
			)
	)
}

export default InjuryReport

