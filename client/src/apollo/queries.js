import gql from 'graphql-tag'

import BasicPlayerInfoFragment from './fragments'

// query to fetch user's info to initialize apollo cache
export const ME_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		me {
			id
			team {
				players {
					...BasicPlayerInfo
					stats {
						category
						value
					}
				}
			}
		}
	}
`

export const PROJECTIONS_QUERY = gql`
	query {
		myTeam {
			players {
				stats {
					category
					value
				}
				gameCountThisWeek
			}
		}
	}
`

export const INJURIES_QUERY = gql`
	query {
		myTeam {
			players {
				id
				injury {
					playingProbability
					description
				}
				fullName
				imageSrc
			}
		}
	}
`

export const ALL_PLAYERS_QUERY = gql`
	${BasicPlayerInfoFragment}
	query allPlayersQuery($filter: String) {
		allPlayers(filter: $filter) {
			...BasicPlayerInfo
		}
	}
`

export const USER_TEAM_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		userTeam @client {
			...BasicPlayerInfo
			stats {
				category
				value
			}
		}
	}
`

export const LOGGED_IN_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		loggedIn @client
	}
`
