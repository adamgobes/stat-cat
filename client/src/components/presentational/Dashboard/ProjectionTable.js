import React from 'react'
import { graphql } from 'react-apollo'
import { compose, branch, renderComponent } from 'recompose'

import { PROJECTIONS_QUERY, LOGGED_IN_QUERY } from '../../../apollo/queries'

function parseDate(date) {
	const year = date.getFullYear()
	const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
	const day = date.getDate() > 9 ? date.getDate() + 1 : `0${date.getDate() + 1}`

	return `${year}${month}${day}`
}

function getStartDate() {
	const date = new Date()
	const day = date.getDay()
	let prevMonday
	if (date.getDay() === 0) {
		prevMonday = new Date().setDate(date.getDate() - 7)
	} else {
		prevMonday = new Date().setDate(date.getDate() - day)
	}

	return new Date(prevMonday)
}

function getEndDate(startDate) {
	const endDate = new Date().setDate(startDate.getDate() + 7)
	return new Date(endDate)
}

const ProjectionTable = ({ projectionsData }) => {
	const { projections } = projectionsData
	return projections.map(p => <div key={p.category}>{`${p.category}:${p.value}`}</div>)
}

export default compose(
	graphql(LOGGED_IN_QUERY, { name: 'current' }),
	graphql(PROJECTIONS_QUERY, {
		options: props => ({
			variables: {
				userId: props.current.loggedIn,
				startDate: parseDate(getStartDate()),
				endDate: parseDate(getEndDate(getStartDate())),
			},
			fetchPolicy: 'network-only',
		}),
		name: 'projectionsData',
	}),
	branch(props => props.projectionsData.loading, renderComponent(() => <div>loading</div>))
)(ProjectionTable)
