import { Prisma, models } from '../generated/prisma-client/index'
import { typeDefs } from '../generated/prisma-client/prisma-schema'
import { register, login, saveTeam } from './Mutation'
import { players } from './Team'

const prismaInstance: Prisma = new Prisma()

const TEST_EMAIL: string = 'test@gmail.com'
let testTeamId: string
let authToken: string

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
        authToken = loginToken

        expect(loginToken).not.toBeNull()
    })

    it('adds players to the users team', async () => {
        const parent = {}
        const ctx = {
            prisma: prismaInstance,
            request: {
                get: () => `Bearer ${authToken}`,
            },
        }
        const info = {}

        const sampleIds: string[] = ['9158', '9369', '9232', '9387']

        const addPlayerArgs = {
            teamId: testTeamId,
            playerIds: sampleIds,
        }

        const { players: playerIds } = await saveTeam(parent, addPlayerArgs, ctx)

        expect(playerIds).toEqual(sampleIds)
    })
})
