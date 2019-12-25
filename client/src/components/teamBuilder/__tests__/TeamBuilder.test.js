import React from 'react'
import { Grommet } from 'grommet'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'

import theme from '../../../theme'
import TeamBuilder from '../TeamBuilder'
import { MY_TEAM_QUERY, SEARCH_PLAYERS_QUERY } from '../../../apollo/queries'
import { myTeamData } from '../stories/teamBuilderStoriesData'
import { TeamBuilderContextProvider } from '../TeamBuilderContext'
import { receivingSearchData as searchData } from '../../tradeSimulator/stories/tradeSimulatorStoriesData'
import { AppContextProvider } from '../../general/AppContext'
import { TEAM_ID } from '../../../utils/strings'

const SEARCH_STRING = 'julius randle'

const teamBuilderMocks = [
    {
        request: {
            query: MY_TEAM_QUERY,
            variables: { teamId: TEAM_ID },
        },

        result: () => ({
            data: myTeamData,
        }),
    },
    {
        request: {
            query: SEARCH_PLAYERS_QUERY,
            variables: { filter: SEARCH_STRING },
        },
        result: () => ({
            data: searchData,
        }),
    },
]

const teamBuilderWithThemeAndProvider = (
    <Grommet theme={theme}>
        <MockedProvider mocks={teamBuilderMocks} addTypename>
            <AppContextProvider initialState={{ selectedTeam: TEAM_ID }}>
                <TeamBuilderContextProvider>
                    <TeamBuilder />
                </TeamBuilderContextProvider>
            </AppContextProvider>
        </MockedProvider>
    </Grommet>
)

describe('Team Builder Tests', () => {
    afterAll(() => {
        cleanup()
    })

    it('should render loading state initially', () => {
        const { getByTestId } = render(teamBuilderWithThemeAndProvider)
        const loader = getByTestId('loader')

        expect(loader).toBeDefined()
    })

    it('should allow a user to search for players, add them, and remove them', async () => {
        const { findByTestId, getByText, getByPlaceholderText, getAllByText, queryByText } = render(
            teamBuilderWithThemeAndProvider
        )
        const searchInput = await waitForElement(() => getByPlaceholderText('Search for players'))
        fireEvent.change(searchInput, { target: { value: SEARCH_STRING } })

        expect(await findByTestId('team-builder-search-result')).toBeDefined()

        fireEvent.click(getByText('+'))

        expect(getByText('J. Randle')).toBeDefined()

        const removeButtons = getAllByText('-')

        fireEvent.click(removeButtons[removeButtons.length - 1])

        expect(queryByText('J. Randle')).toBeNull()
    })
})
