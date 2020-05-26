import gql from 'graphql-tag'

export default gql`
    type Team {
        id: ID!
        name: String!
        owner: User!
        players(timeFrame: String): [Player!]!
        espnId: ID
    }

    type Player {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
        position: String!
        currentTeam: NbaTeam
        imageSrc: String
        stats: [Stat!]
        gameCountThisWeek: Int
        injury: Injury
    }

    type Injury {
        playingProbability: String!
        description: String!
    }

    type Stat {
        category: String!
        value: Float!
    }

    type NbaTeam {
        id: ID!
        abbreviation: String!
    }

    type LeagueLeader {
        stat: String!
        leaders: [Player!]!
    }
`
