import gql from 'graphql-tag'

export default gql`
    type FantasyLeagueInvitation {
        id: ID!
        email: String!
        sentOn: String!
    }

    type FantasyLeague {
        id: ID!
        name: String!
        teams: [Team!]!
        espnId: ID!
        invitations: [FantasyLeagueInvitation]
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
