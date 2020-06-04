import gql from 'graphql-tag'

import BasicPlayerInfoFragment from './fragments'

export const SAVE_TEAM_MUTATION = gql`
    ${BasicPlayerInfoFragment}
    mutation saveTeamMutation($playerIds: [ID!]!, $teamId: String!) {
        saveTeam(playerIds: $playerIds, teamId: $teamId) {
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
            teamIds
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation loginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            teamIds
        }
    }
`

export const CREATE_TEAM_MUTATION = gql`
    mutation createTeamMutation($name: String!) {
        addTeam(name: $name) {
            name
            id
        }
    }
`

export const CREATE_LEAGUE_MUTATION = gql`
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

export const CONNECT_ESPN_TEAM = gql`
    mutation connectESPNTeam($leagueId: ID!, $statCatTeamId: ID!, $espnTeamId: ID!) {
        addFantasyLeagueMember(
            leagueId: $leagueId
            statCatTeamId: $statCatTeamId
            espnTeamId: $espnTeamId
        )
    }
`

export const DISCONNECT_ESPN_TEAM = gql`
    mutation disconnectESPNTeam($statCatTeamId: ID!) {
        removeFantasyLeagueMember(statCatTeamId: $statCatTeamId)
    }
`
