import gql from 'graphql-tag'

export default gql`
    type FantasyLeague {
        id: ID!
        name: String!
        teams: [Team!]!
        espnId: ID!
    }

    type LeagueMemberEntry {
        teamId: Int!
        teamName: String!
    }

    type CreateLeagueResponse {
        leagueName: String!
        espnId: ID!
        leagueMembers: [LeagueMemberEntry]
    }
`
