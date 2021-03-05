import { mocked } from 'ts-jest/utils'
import { graphqlTestCall } from '../testUtils/gqlTestClient'
import {
    registerMutation,
    loginMutation,
    saveTeamMutation,
    createTeamMutation,
    createLeagueMutation,
    inviteMemberMutation,
    addFantasyLeagueMemberMutation,
    getFantasyLeagueQuery,
} from '../testUtils/testQueries'
import { getLeagueInformation, getESPNTeamPlayers } from '../scraper/index'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prismaClient'
import { playerNamesToIds } from '../sportsFeed/api'

jest.mock('../scraper/index')
jest.mock('../sportsFeed/api')

jest.setTimeout(5000 * 2)

const prismaInstance: PrismaClient = new PrismaClient()

const TEST_EMAIL: string = 'test@gmail.com'
const TEST_NAME: string = 'Test'
const TEST_PASSWORD: string = 'test'

const sampleIds: string[] = ['9158', '9369', '9232', '9387']

let testTeamId: string
let authToken: string
let espnId: string

afterAll(async () => {
    await prismaInstance.fantasyLeague.delete({ where: { espnId } })
    await prismaInstance.team.delete({ where: { id: testTeamId } })
    await prismaInstance.user.delete({ where: { email: TEST_EMAIL } })
    await prismaInstance.$disconnect()
})

describe('resolvers', () => {
    it('register and login mutations', async () => {
        const registerVariables = {
            email: TEST_EMAIL,
            name: TEST_NAME,
            password: TEST_PASSWORD,
        }

        const { data: registerData, errors } = await graphqlTestCall(
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

        await prismaInstance.team.delete({ where: { id: newTeamId } })

        expect(name).toBe(newTeamName)
        expect(newTeamId).toBeDefined()
    })

    it('allows the user to connect their fantasy league', async () => {
        const testLeagueId: string = '24502'
        const testLeagueName: string = 'Test League Name'
        const testLeagueMembers: string[] = [
            'league member 1',
            'league member 2',
            'league member 3',
        ]

        const expectedReturnLeagueInfo = new Promise<{ leagueName: any; leagueMembers: any }>(
            (resolve, reject) => {
                resolve({
                    leagueName: testLeagueName,
                    leagueMembers: testLeagueMembers,
                })
            }
        )

        const mockedFuncLeague = mocked(getLeagueInformation, true)

        mockedFuncLeague.mockReturnValueOnce(expectedReturnLeagueInfo)

        const newLeagueVariables = {
            leagueId: testLeagueId,
        }

        const { data: newLeagueData, errors } = await graphqlTestCall(
            createLeagueMutation,
            prismaInstance,
            newLeagueVariables,
            authToken
        )

        const { leagueName, leagueMembers } = newLeagueData.createFantasyLeague
        espnId = newLeagueData.createFantasyLeague.espnId

        expect(errors).toBeUndefined()

        expect(leagueName).toBe(testLeagueName)
        expect(espnId).toBe(testLeagueId)
        expect(leagueMembers[0]).toEqual({
            teamId: 1,
            teamName: testLeagueMembers[0],
        })

        const expectedReturnTeamInfo = new Promise<{ espnTeamName: any; playerNames: any }>(
            (resolve, reject) => {
                resolve({
                    espnTeamName: 'Test ESPN Team Name',
                    playerNames: ['Lebron', 'Melo'],
                })
            }
        )

        const expectedReturnIds = new Promise<string[]>((resolve, reject) => {
            resolve(['123', '456'])
        })

        const mockedFuncTeam = mocked(getESPNTeamPlayers, true)
        const mockedFuncIds = mocked(playerNamesToIds, true)

        mockedFuncTeam.mockReturnValueOnce(expectedReturnTeamInfo)
        mockedFuncIds.mockReturnValueOnce(expectedReturnIds)

        const addLeagueMemberVariables = {
            leagueId: testLeagueId,
            statCatTeamId: testTeamId,
            espnTeamId: 1,
        }

        const { data: addLeagueMemberData, errors: addError } = await graphqlTestCall(
            addFantasyLeagueMemberMutation,
            prismaInstance,
            addLeagueMemberVariables,
            authToken
        )

        expect(addError).toBeUndefined()
    })

    it('allows the user to invite other users to their fantasy league', async () => {
        const testLeagueId: string = '24502'
        const testEmail = 'test@test.com'

        const inviteMemberVariables = {
            leagueId: testLeagueId,
            email: testEmail,
        }

        const { data: inviteMemberData, errors } = await graphqlTestCall(
            inviteMemberMutation,
            prismaInstance,
            inviteMemberVariables,
            authToken
        )

        const { email } = inviteMemberData.inviteUserToLeague

        expect(errors).toBeUndefined()
        expect(email).toEqual(testEmail)

        const { data: leagueData, errors: leagueErrors } = await graphqlTestCall(
            getFantasyLeagueQuery,
            prismaInstance,
            { statCatTeamId: testTeamId },
            authToken
        )

        await prismaInstance.fantasyLeagueInvitation.delete({ where: { email } })

        expect(leagueErrors).toBeUndefined()
        expect(leagueData.getFantasyLeague.name).toBe('Test League Name')
        expect(leagueData.getFantasyLeague.invitations.length).toBe(1)
    })
})
