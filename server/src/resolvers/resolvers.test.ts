import { Prisma, models } from '../generated/prisma-client/index'
import { typeDefs } from '../generated/prisma-client/prisma-schema'
import { register, login, saveTeam } from './Mutation'
import { players } from './Team'
import { graphqlTestCall } from '../testUtils/gqlTestClient'
import { registerMutation, loginMutation } from '../testUtils/testQueries'

const prismaInstance: Prisma = new Prisma()

const TEST_EMAIL: string = 'test@gmail.com'
const TEST_NAME: string = 'Test'
const TEST_PASSWORD: string = 'test'

let testTeamId: string
let authToken: string

afterAll(async () => {
    await prismaInstance.deleteTeam({ id: testTeamId })
    await prismaInstance.deleteUser({ email: TEST_EMAIL })
})

describe('resolvers', () => {
    it('register and login mutations', async () => {
        const registerVariables = {
            email: TEST_EMAIL,
            name: TEST_NAME,
            password: TEST_PASSWORD,
        }

        const { data: registerData } = await graphqlTestCall(
            registerMutation,
            prismaInstance,
            registerVariables
        )

        const { token, teamIds } = registerData.register
        testTeamId = teamIds[0]

        expect(token).not.toBeNull()
        expect(testTeamId).not.toBeNull()

        const loginVariables = {
            email: TEST_EMAIL,
            password: TEST_PASSWORD,
        }

        const { data: loginData } = await graphqlTestCall(
            loginMutation,
            prismaInstance,
            loginVariables
        )

        expect(loginData.token).not.toBeNull()
        authToken = token
    })
})
