import gql from 'graphql-tag'

// query to fetch user's info to initialize mobx store
export const ME_QUERY = gql`
	query {
		me {
			id
			team {
				players {
					id
					fullName
					currentTeam {
						abbreviation
					}
					position
					imageSrc
				}
			}
		}
	}
`

export const SAVE_TEAM_MUTATION = gql`
	mutation saveTeamMutation($playerIds: [ID!]!) {
		saveTeam(playerIds: $playerIds) {
			players {
				id
				fullName
				currentTeam {
					abbreviation
				}
				position
				imageSrc
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
	query allPlayersQuery($filter: String) {
		allPlayers(filter: $filter) {
			id
			fullName
			imageSrc
		}
	}
`
