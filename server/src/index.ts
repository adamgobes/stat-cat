import { GraphQLServer } from 'graphql-yoga'
import * as dotenv from 'dotenv'

import typeDefs from './schemas/index'
import { PrismaClient } from '@prisma/client'
import { resolvers } from './resolvers'

dotenv.config()

export interface Context {
    request: any
    prisma: PrismaClient
}

const server = new GraphQLServer({
    context: request => ({ ...request, prisma: new PrismaClient() }), // attach request object (for Authorization) and prisma client to context
    resolvers,
    typeDefs,
})
server.start(() => console.log('Server running...'))
