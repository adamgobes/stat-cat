import gql from 'graphql-tag'

export default gql`
    type FantasyLeague {
        id: ID!
        name: String!
        teams: [Team!]!
        espnId: ID!
    }
`
