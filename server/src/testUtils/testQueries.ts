export const registerMutation = `
mutation RegisterMutation($email: String!, $name: String! $password: String!) {
    register(email: $email, name: $name, password: $password) {
		token
		teamIds
	}
}
`

export const loginMutation = `
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
		token
	}
}
`

export const saveTeamMutation = `
mutation saveTeamMutation($playerIds: [ID!]!, $teamId: String!) {
	saveTeam(playerIds: $playerIds, teamId: $teamId) {
		players {
			id
		}
	}
}
`

export const createTeamMutation = `
mutation createTeamMutation($name: String!) {
	addTeam(name: $name) {
		name
		id
	}
}
`
