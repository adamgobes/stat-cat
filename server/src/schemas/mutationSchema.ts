import gql from 'graphql-tag'

export default gql`
    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayLoad
        login(email: String!, password: String!): AuthPayLoad

        saveTeam(playerIds: [ID!]!, teamId: String!): Team
        addTeam(name: String!): Team

        createFantasyLeague(leagueId: ID!): CreateLeagueResponse

        inviteUserToLeague(leagueId: ID!, email: String!): FantasyLeagueInvitation
        addFantasyLeagueMember(leagueId: ID!, statCatTeamId: ID!, espnTeamId: ID!): Boolean
        removeFantasyLeagueMember(statCatTeamId: ID!): Boolean
        syncTeam(statCatTeamId: ID!): Boolean
    }
`
