import React from 'react'
import { Grommet } from 'grommet'
import { render, waitForElement, fireEvent, within, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import { WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY } from '../../../apollo/queries'
import { weeklyOverviewData, myStatsData } from '../stories/dashboardStoriesData'
import Dashboard from '../Dashboard'
import { AppContextProvider, initialAppState } from '../../general/AppContext'
import { TEAM_ID } from '../../../utils/strings'

const dashboardMocks = [
    {
        request: {
            query: WEEKLY_OVERVIEW_QUERY,
            variables: { teamId: TEAM_ID },
        },
        result: () => ({
            data: weeklyOverviewData,
        }),
    },
    {
        request: {
            query: MY_STATS_QUERY,
            variables: { timeFrame: 'All', teamId: TEAM_ID },
        },
        result: () => ({
            data: myStatsData,
        }),
    },
]

const dashboardWithThemeAndProvider = (
    <Grommet theme={theme}>
        <MockedProvider mocks={dashboardMocks} addTypename>
            <AppContextProvider initialState={{ ...initialAppState, selectedTeam: TEAM_ID }}>
                <Dashboard />
            </AppContextProvider>
        </MockedProvider>
    </Grommet>
)

describe('Dashboard Tests', () => {
    afterAll(() => {
        cleanup()
    })

    it('should render loading state initially', () => {
        const { getByTestId } = render(dashboardWithThemeAndProvider)
        const loader = getByTestId('loader')

        expect(loader).toBeDefined()
    })

    it('renders the users weekly overview and stats', async () => {
        const { getByText, getByTestId } = render(dashboardWithThemeAndProvider)

        const myStatsContainer = await waitForElement(() => getByTestId('mystats'))
        const weeklyOverviewContainer = await waitForElement(() => getByTestId('weeklyoverview'))

        const playerName = within(weeklyOverviewContainer).getByText('L. James')

        expect(playerName).toBeDefined()

        const averageName = within(myStatsContainer).getByText('Points')
        const averageValue = within(myStatsContainer).getByText('14.8')

        expect(averageName).toBeDefined()
        expect(averageValue).toBeDefined()

        fireEvent.click(getByText('Player Stats'))

        const playerPPG = within(myStatsContainer).getByText('L. James')

        expect(playerPPG).toBeDefined()
    })
})
