import gql from 'graphql-tag'

export default gql`
    type User {
        id: ID!
        email: String!
        name: String!
        teams: [Team!]!
    }

    type AuthPayLoad {
        token: String
        teamIds: [String!]!
    }
`
