import React from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'

import { PROJECTIONS_QUERY } from '../../../apollo/queries'
import { computeProjections } from '../../../utils/computeHelpers'

const ProjectionTable = ({ projectionsData: { myTeam } }) => {
	const { players } = myTeam
	const projections = computeProjections(players)
	return projections.map(p => <div key={p.category}>{`${p.category}:${p.value}`}</div>)
}

export default compose(
	graphql(PROJECTIONS_QUERY, {
		options: props => ({
			fetchPolicy: 'network-only',
		}),
		name: 'projectionsData',
	}),
	branch(props => props.projectionsData.loading, renderComponent(() => <div>loading</div>))
)(ProjectionTable)
