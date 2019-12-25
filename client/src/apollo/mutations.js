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
