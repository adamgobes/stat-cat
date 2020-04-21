import { Prisma } from '../generated/prisma-client/index'
import { graphqlTestCall } from '../testUtils/gqlTestClient'
import {
    registerMutation,
    loginMutation,
    saveTeamMutation,
    createTeamMutation,
} from '../testUtils/testQueries'

const prismaInstance: Prisma = new Prisma()

const TEST_EMAIL: string = 'test@gmail.com'
const TEST_NAME: string = 'Test'
const TEST_PASSWORD: string = 'test'

const sampleIds: string[] = ['9158', '9369', '9232', '9387']

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

    it('adds players to the users team', async () => {
        const saveTeamVariables = {
            playerIds: sampleIds,
            teamId: testTeamId,
        }

        const { data: saveTeamData, errors } = await graphqlTestCall(
            saveTeamMutation,
            prismaInstance,
            saveTeamVariables,
            authToken
        )

        expect(errors).toBeUndefined()
        expect(saveTeamData).toBeDefined()
    })

    it('allows the user to create a new fantasy team', async () => {
        const newTeamName: string = 'Some New Team'

        const newTeamVariables = {
            name: newTeamName,
        }

        const { data: newTeamData, errors } = await graphqlTestCall(
            createTeamMutation,
            prismaInstance,
            newTeamVariables,
            authToken
        )

        const { name, id: newTeamId } = newTeamData.addTeam

        await prismaInstance.deleteTeam({ id: newTeamId })

        expect(name).toBe(newTeamName)
        expect(newTeamId).toBeDefined()
    })
})
