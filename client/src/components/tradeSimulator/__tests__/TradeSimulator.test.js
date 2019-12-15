import React from 'react'
import { Grommet } from 'grommet'
import { render, waitForElement, fireEvent, within, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import TradeSimulator from '../TradeSimulator'
import {
    MY_STATS_QUERY,
    SEARCH_PLAYERS_QUERY,
    GET_PLAYER_STATS_QUERY,
} from '../../../apollo/queries'
import { searchData, getPlayerStatsData } from '../stories/tradeSimulatorStoriesData'
import { myStatsData } from '../../dashboard/stories/dashboardStoriesData'

const tradeSimulatorMocks = [
    {
        request: {
            query: MY_STATS_QUERY,
        },
        result: () => ({
            data: myStatsData,
        }),
    },
    {
        request: {
            query: SEARCH_PLAYERS_QUERY,
            variables: { filter: 'leb' },
        },
        result: () => ({
            data: searchData,
        }),
    },
    {
        request: {
            query: GET_PLAYER_STATS_QUERY,
            variables: { variables: { playerIds: ['1928'] } },
        },
        result: () => ({
            data: getPlayerStatsData,
        }),
    },
]

const tradeSimulatorWithThemeAndProvider = (
    <Grommet theme={theme}>
        <MockedProvider mocks={tradeSimulatorMocks} addTypename>
            <TradeSimulator />
        </MockedProvider>
    </Grommet>
)

describe('Trade Simulator Tests', () => {
    afterAll(() => {
        cleanup()
    })

    it('should render loading state initially', () => {
        const { getByTestId } = render(tradeSimulatorWithThemeAndProvider)
        const loader = getByTestId('loader')

        expect(loader).toBeDefined()
    })
})
