const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const typeDefs = './src/schema.graphql'
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const resolvers = {
	Query,
	Mutation,
}

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: request => ({ ...request, prisma }),
})
server.start(() => console.log('Server is running on http://localhost:4000'))
