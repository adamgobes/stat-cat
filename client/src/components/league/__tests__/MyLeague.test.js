import React from 'react'
import { Grommet } from 'grommet'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { render, waitForElement, fireEvent, within, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import { CREATE_LEAGUE_MUTATION } from '../../../apollo/mutations'
import MyLeague from '../MyLeague'
import { AppContextProvider, initialAppState } from '../../general/AppContext'
import { TEAM_ID } from '../../../utils/strings'

const TEST_LEAGUE_ID = '12345'

const leagueMocks = [
    {
        request: {
            query: CREATE_LEAGUE_MUTATION,
            variables: { leagueId: TEST_LEAGUE_ID },
        },
        result: () => ({
            data: {
                createFantasyLeague: {
                    leagueName: 'Schecker Bowl v3',
                    leagueMembers: [
                        {
                            teamId: 1,
                            teamName: "Ayton Didn'tDoIt",
                            __typename: 'LeagueMemberEntry',
                        },
                        { teamId: 2, teamName: 'Team Jimenez', __typename: 'LeagueMemberEntry' },
                        {
                            teamId: 3,
                            teamName: 'TwoTime Reigning Champs',
                            __typename: 'LeagueMemberEntry',
                        },
                        { teamId: 4, teamName: 'Guard Central', __typename: 'LeagueMemberEntry' },
                        { teamId: 5, teamName: 'TeAm BalL sAcK', __typename: 'LeagueMemberEntry' },
                        { teamId: 6, teamName: 'Marco FC', __typename: 'LeagueMemberEntry' },
                        { teamId: 7, teamName: 'Team Rachid', __typename: 'LeagueMemberEntry' },
                        { teamId: 8, teamName: 'Anal  Embiids', __typename: 'LeagueMemberEntry' },
                        {
                            teamId: 9,
                            teamName: 'HF Demar DeFrozen',
                            __typename: 'LeagueMemberEntry',
                        },
                        {
                            teamId: 10,
                            teamName: 'Gobran Jr. Gobran',
                            __typename: 'LeagueMemberEntry',
                        },
                    ],
                    espnId: '24540202',
                    __typename: 'CreateLeagueResponse',
                },
            },
        }),
    },
]

const myLeagueWithThemeAndProvider = (
    <Grommet theme={theme}>
        <Router history={createMemoryHistory()}>
            <MockedProvider mocks={leagueMocks} addTypename>
                <AppContextProvider initialState={{ ...initialAppState, selectedTeam: TEAM_ID }}>
                    <MyLeague />
                </AppContextProvider>
            </MockedProvider>
        </Router>
    </Grommet>
)

describe('My League Tests', () => {
    afterAll(() => {
        cleanup()
    })

    it('allows the user to search for their league and team', async () => {
        const { getByText, getByTestId, findByText } = render(myLeagueWithThemeAndProvider)

        const myLeague = await waitForElement(() => getByTestId('myleague'))

        const espnLeagueIdInput = within(myLeague).getByPlaceholderText('Enter ESPN League ID')
        expect(espnLeagueIdInput).toBeDefined()

        fireEvent.change(espnLeagueIdInput, { target: { value: TEST_LEAGUE_ID } })

        fireEvent.click(getByText('Connect League'))

        expect(await findByText('Select your team')).toBeDefined()

        const connectLeague = within(myLeague).getByTestId('connectleague')

        const firstTeamCell = within(connectLeague).getByText(`Ayton Didn'tDoIt`)

        expect(firstTeamCell).toBeDefined()
    })
})
