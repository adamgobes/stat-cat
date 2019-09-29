import { GraphQLServer } from 'graphql-yoga'
import * as dotenv from 'dotenv'

import { prisma } from './generated/prisma-client'

import * as Mutation from './resolvers/Mutation'
import * as Player from './resolvers/Player'
import * as Query from './resolvers/Query'
import * as Team from './resolvers/Team'
import * as User from './resolvers/User'

dotenv.config()

const resolvers = {
    Mutation,
    Player,
    Query,
    Team,
    User,
}

const typeDefs = './src/schema.graphql'

const server = new GraphQLServer({
    context: request => ({ ...request, prisma }), // attach request object (for Authorization) and prisma client to context
    resolvers,
    typeDefs,
})
server.start(() => console.log('Server is running...'))
