import React from 'react'
import { Grommet } from 'grommet'
import { render, waitForElement } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import { WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY } from '../../../apollo/queries'
import { weeklyOverviewData, myStatsData } from '../stories/dashboardStoriesData'
import Dashboard from '../Dashboard'

const dashboardMocks = [
    {
        request: {
            query: WEEKLY_OVERVIEW_QUERY,
        },
        result: () => ({
            data: weeklyOverviewData,
        }),
    },
    {
        request: {
            query: MY_STATS_QUERY,
            variables: { timeFrame: 'All' },
        },
        result: () => ({
            data: myStatsData,
        }),
    },
]

describe('Dashboard Tests', () => {
    let dashboardWithThemeAndProvider

    beforeAll(() => {
        dashboardWithThemeAndProvider = (
            <Grommet theme={theme}>
                <MockedProvider mocks={dashboardMocks} addTypename>
                    <Dashboard />
                </MockedProvider>
            </Grommet>
        )
    })
    it('should render loading state initially', () => {
        const { getByTestId } = render(dashboardWithThemeAndProvider)
        const loader = getByTestId('loader')

        expect(loader).toBeDefined()
    })
    it('renders without error', async () => {
        const { getByText } = render(dashboardWithThemeAndProvider)
        const weeklyOverviewHeader = await waitForElement(() => getByText('Weekly Overview'))
        const teamStatsHeader = await waitForElement(() => getByText('Team Stats'))
        const playerStatsHeader = await waitForElement(() => getByText('Player Stats'))

        expect(weeklyOverviewHeader).toBeDefined()
        expect(teamStatsHeader).toBeDefined()
        expect(playerStatsHeader).toBeDefined()
    })
})
