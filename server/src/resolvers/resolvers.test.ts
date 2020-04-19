import { Prisma, models } from '../generated/prisma-client/index'
import { typeDefs } from '../generated/prisma-client/prisma-schema'
import { register, login } from './Mutation'

const prismaInstance: Prisma = new Prisma()

const TEST_EMAIL: string = 'test@gmail.com'
let testTeamId: string

afterAll(async () => {
    await prismaInstance.deleteTeam({ id: testTeamId })
    await prismaInstance.deleteUser({ email: TEST_EMAIL })
})

describe('resolvers', () => {
    it('register and login mutations', async () => {
        const parent = {}
        const ctx = {
            prisma: prismaInstance,
        }
        const info = {}

        const registerArgs = {
            email: TEST_EMAIL,
            name: 'Test',
            password: 'test',
        }

        const { token: registerToken, teamIds } = await register(parent, registerArgs, ctx, info)
        testTeamId = teamIds[0]

        expect(registerToken).not.toBeNull()

        const loginArgs = {
            email: TEST_EMAIL,
            password: 'test',
        }

        const { token: loginToken } = await login(parent, loginArgs, ctx, info)

        expect(loginToken).not.toBeNull()
    })
})
