import { Prisma } from '../generated/prisma-client/index'
import { mocked } from 'ts-jest/utils'
import { graphqlTestCall } from '../testUtils/gqlTestClient'
import {
    registerMutation,
    loginMutation,
    saveTeamMutation,
    createTeamMutation,
    createLeagueMutation,
} from '../testUtils/testQueries'
import { getLeagueInformation } from '../scraper/league'

jest.mock('../scraper/league')

jest.setTimeout(5000 * 2)

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

    it('allows the user to connect their fantasy league', async () => {
        const leagueId: string = '24502'
        const testLeagueName: string = 'Test League Name'
        const testLeagueMembers: string[] = [
            'league member 1',
            'league member 2',
            'league member 3',
        ]

        const expectedReturn = new Promise<{ leagueName: any; leagueMembers: any }>(
            (resolve, reject) => {
                resolve({
                    leagueName: testLeagueName,
                    leagueMembers: testLeagueMembers,
                })
            }
        )

        const mockedFunc = mocked(getLeagueInformation, true)

        mockedFunc.mockReturnValueOnce(expectedReturn)

        const newLeagueVariables = {
            leagueId,
        }

        const { data: newLeagueData, errors } = await graphqlTestCall(
            createLeagueMutation,
            prismaInstance,
            newLeagueVariables,
            authToken
        )

        console.log(newLeagueData)
        const { leagueName, espnId, leagueMembers } = newLeagueData.createFantasyLeague

        await prismaInstance.deleteFantasyLeague({ espnId })

        expect(errors).toBeUndefined()
        expect(newLeagueData).toBeDefined()

        expect(leagueName).toBe(testLeagueName)
        expect(espnId).toBe(leagueId)
        expect(leagueMembers[0]).toEqual({
            teamId: 1,
            teamName: testLeagueMembers[0],
        })
    })
})
