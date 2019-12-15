import React from 'react'
import { Grommet } from 'grommet'
import { render, waitForElement, fireEvent, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import TradeSimulator from '../TradeSimulator'
import {
    MY_STATS_QUERY,
    SEARCH_PLAYERS_QUERY,
    GET_PLAYER_STATS_QUERY,
} from '../../../apollo/queries'
import {
    sendingSearchData,
    getPlayerStatsData,
    receivingSearchData,
} from '../stories/tradeSimulatorStoriesData'
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
            variables: { filter: 'green' },
        },
        result: () => ({
            data: sendingSearchData,
        }),
    },
    {
        request: {
            query: SEARCH_PLAYERS_QUERY,
            variables: { filter: 'randle' },
        },
        result: () => ({
            data: receivingSearchData,
        }),
    },
    {
        request: {
            query: SEARCH_PLAYERS_QUERY,
            variables: { filter: 'randle' },
        },
        result: () => ({
            data: sendingSearchData,
        }),
    },
    {
        request: {
            query: GET_PLAYER_STATS_QUERY,
            variables: { playerIds: ['9282'] },
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

    it('allows user to search for players, send and receive them, and simulate a trade', async () => {
        const {
            findAllByTestId,
            findByTestId,
            getByText,
            getByPlaceholderText,
            findByText,
        } = render(tradeSimulatorWithThemeAndProvider)

        const searchInput = await waitForElement(() => getByPlaceholderText('Search for players'))
        fireEvent.change(searchInput, { target: { value: 'green' } })

        expect((await findAllByTestId('trade-search-result')).length).toBe(3)

        fireEvent.click(getByText('Send'))

        fireEvent.change(searchInput, { target: { value: 'randle' } })

        expect(await findByTestId('trade-search-result')).toBeDefined()

        fireEvent.click(getByText('Receive'))

        fireEvent.click(getByText('Simulate Trade'))

        expect(await findByText('Delta')).toBeDefined()
    })
})
