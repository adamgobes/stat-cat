import { PrismaClient } from '@prisma/client'
import { graphql } from 'graphql'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { resolvers } from '../resolvers'
import typeDefs from '../schemas'

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async (
    query: any,
    prismaInstance: PrismaClient,
    variables?: any,
    authToken?: string
) => {
    return graphql(
        schema,
        query,
        undefined,
        {
            prisma: prismaInstance,
            request: {
                get: () => `Bearer ${authToken}`,
            },
        },
        variables
    )
}
