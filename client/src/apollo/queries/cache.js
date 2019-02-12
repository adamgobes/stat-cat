import gql from 'graphql-tag'

import BasicPlayerInfoFragment from '../fragments'

export const USER_TEAM_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		userTeam @client {
			...BasicPlayerInfo
		}
	}
`

export const LOGGED_IN_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		loggedIn @client
	}
`
