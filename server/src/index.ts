import { GraphQLServer } from 'graphql-yoga'
import * as dotenv from 'dotenv'

import typeDefs from './schemas/index'
import { prisma } from './generated/prisma-client'
import { resolvers } from './resolvers'

dotenv.config()

const server = new GraphQLServer({
    context: request => ({ ...request, prisma }), // attach request object (for Authorization) and prisma client to context
    resolvers,
    typeDefs,
})
server.start(() => console.log('Server running...'))
