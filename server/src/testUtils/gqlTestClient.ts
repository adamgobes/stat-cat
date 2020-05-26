import { graphql } from 'graphql'
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import { Prisma } from '../generated/prisma-client'
import { resolvers } from '../resolvers'
import typeDefs from '../schemas'

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async (
    query: any,
    prismaInstance: Prisma,
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
