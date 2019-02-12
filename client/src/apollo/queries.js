import gql from 'graphql-tag'

const BasicPlayerInfoFragment = gql`
	fragment BasicPlayerInfo on Player {
		id
		fullName
		currentTeam {
			abbreviation
		}
		position
		imageSrc
	}
`
export const USER_TEAM_QUERY = gql`
	${BasicPlayerInfoFragment}
	query {
		userTeam @client {
			...BasicPlayerInfo
		}
	}
`

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

export const SAVE_TEAM_MUTATION = gql`
	${BasicPlayerInfoFragment}
	mutation saveTeamMutation($playerIds: [ID!]!) {
		saveTeam(playerIds: $playerIds) {
			players {
				...BasicPlayerInfo
			}
		}
	}
`

export const REGISTER_MUTATION = gql`
	mutation registerMutation($name: String!, $email: String!, $password: String!) {
		register(name: $name, email: $email, password: $password) {
			token
		}
	}
`

export const LOGIN_MUTATION = gql`
	mutation loginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
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
