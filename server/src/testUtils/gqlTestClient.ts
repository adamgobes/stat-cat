import { graphql } from 'graphql'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from '../generated/prisma-client'
import { resolvers } from '../resolvers'

const typeDefs = importSchema('src/schema.graphql')

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async (query: any, prismaInstance: Prisma, variables?: any) => {
    return graphql(
        schema,
        query,
        undefined,
        {
            prisma: prismaInstance,
        },
        variables
    )
}
