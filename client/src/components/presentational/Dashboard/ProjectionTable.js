import React from 'react'

import { computeProjections } from '../../../utils/computeHelpers'

const ProjectionTable = ({ projectionsData }) => {
	const { players } = projectionsData
	const projections = computeProjections(players)
	return projections.map(p => <div key={p.category}>{`${p.category}:${p.value}`}</div>)
}

export default ProjectionTable
