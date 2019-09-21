import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'

import Mutation from './resolvers/Mutation'
import Player from './resolvers/Player'
import Query from './resolvers/Query'
import Team from './resolvers/Team'
import User from './resolvers/User'

const typeDefs = './src/schema.graphql'

const resolvers = {
    Mutation,
    Player,
    Query,
    Team,
    User,
}

const server = new GraphQLServer({
    context: request => ({ ...request, prisma }), // attach request object (for Authorization) and prisma client to context
    resolvers,
    typeDefs,
})
server.start(() => console.log('Server is running on http://localhost:4000'))
