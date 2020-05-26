import gql from 'graphql-tag'

import userSchema from './userSchema'
import querySchema from './querySchema'
import mutationSchema from './mutationSchema'
import teamSchema from './teamSchema'
import leagueSchema from './leagueSchema'

export default gql`
    ${querySchema}
    ${mutationSchema}
    ${userSchema}
    ${teamSchema}
    ${leagueSchema}
`
