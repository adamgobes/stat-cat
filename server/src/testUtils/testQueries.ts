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
		id
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

export const createLeagueMutation = `
	mutation createLeagueMutation($leagueId: ID!) {
		createFantasyLeague(leagueId: $leagueId) {
			leagueName
			leagueMembers {
				teamId
				teamName
			}
			espnId
		}
	}
`

export const addFantasyLeagueMemberMutation = `
	mutation addFantasyLeagueMemberMutation($leagueId: ID!, $statCatTeamId: ID!, $espnTeamId: ID!) {
		addFantasyLeagueMember(leagueId: $leagueId, statCatTeamId: $statCatTeamId, espnTeamId: $espnTeamId)
	}
`

export const inviteMemberMutation = `
	mutation inviteMemberMutation($leagueId: ID!, $email: String!) {
		inviteUserToLeague(leagueId: $leagueId, email: $email) {
			email
			sentOn
		}	
	}
`

export const getFantasyLeagueQuery = `
	query getFantasyLeague($statCatTeamId: ID!) {
		getFantasyLeague(statCatTeamId: $statCatTeamId) {
			name
			invitations {
				email
			}
		}
	}
`
