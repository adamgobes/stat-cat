import gql from 'graphql-tag'

export default gql`
    fragment BasicPlayerInfo on Player {
        id
        firstName
        lastName
        fullName
        currentTeam {
            abbreviation
        }
        position
        imageSrc
    }
`
