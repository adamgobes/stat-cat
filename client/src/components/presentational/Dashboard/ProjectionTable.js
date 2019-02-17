import React from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'

import { PROJECTIONS_QUERY } from '../../../apollo/queries'
import { computeProjections } from '../../../utils/computeHelpers'

const ProjectionTable = ({ projectionsData }) => {
	const { players } = projectionsData
	const projections = computeProjections(players)
	return projections.map(p => <div key={p.category}>{`${p.category}:${p.value}`}</div>)
}

export default ProjectionTable

