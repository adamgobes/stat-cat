import gql from 'graphql-tag'

export default gql`
    type Query {
        me: User!
        allPlayers(filter: String): [Player!]!
        leagueLeaders(timeFrame: String): [LeagueLeader!]!
        getPlayerStats(playerIds: [ID!]!): [Player!]!
        getTeam(teamId: String): Team
        getUsers(userIds: [ID!]!): [User!]!
        getFantasyLeague(statCatTeamId: ID!): FantasyLeague
    }
`
