import React from 'react'

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
