const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const typeDefs = './src/schema.graphql'
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Team = require('./resolvers/Team')
const User = require('./resolvers/User')
const Player = require('./resolvers/Player')

const resolvers = {
	Query,
	Mutation,
	Team,
	User,
	Player,
}

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: request => ({ ...request, prisma }), // attach request object (for Authorization) and prisma client to context
})
server.start(() => console.log('Server is running on http://localhost:4000'))
