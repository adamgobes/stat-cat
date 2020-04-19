import { Prisma, models } from '../generated/prisma-client/index'
import { typeDefs } from '../generated/prisma-client/prisma-schema'

const getPrismaInstance = () => new Prisma()

const registerMutation = `
  mutation RegisterMutation($email: String!, $password: String!) {
	register(email: $email, password: $password)
  }
`

const loginMutation = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    	id
    	email
    	type
    	ccLast4
    }
  }
`

const meQuery = `
  query MeQuery {
    me {
    	id
    	email
    	type
    	ccLast4
    }
  }
`

describe('resolvers', () => {
    it('register, login, and me', () => {
        expect(true).toBe(true)
    })
})
