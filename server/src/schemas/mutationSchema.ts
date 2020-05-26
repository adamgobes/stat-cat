import gql from 'graphql-tag'

export default gql`
    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayLoad
        login(email: String!, password: String!): AuthPayLoad
        saveTeam(playerIds: [ID!]!, teamId: String!): Team
        addTeam(name: String!): Team
        createFantasyLeague(leagueId: ID!): CreateLeagueResponse
        addFantasyLeagueMember(leagueId: ID!, teamId: ID!): Boolean
        removeFantasyLeagueMember(leagueId: ID!, teamId: ID!): Boolean
    }
`
