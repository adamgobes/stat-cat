import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SuggestionsGrid from '../playerSearch/SuggestionsGrid'

const SuggestionsGridData = [
    {
        id: '10143',
        fullName: 'Dragan Bender',
        currentTeam: {
            abbreviation: 'PHX',
            __typename: 'NbaTeam',
        },
        position: 'PF',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627733.png',
        __typename: 'Player',
    },
    {
        id: '9544',
        fullName: 'Anthony Bennett',
        currentTeam: {
            abbreviation: 'BRO',
            __typename: 'NbaTeam',
        },
        position: 'PF',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203461.png',
        __typename: 'Player',
    },
    {
        id: '11964',
        fullName: 'Ben Bentil',
        currentTeam: null,
        position: 'PF',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627791.png',
        __typename: 'Player',
    },
    {
        id: '9458',
        fullName: 'Ben McLemore',
        currentTeam: {
            abbreviation: 'SAC',
            __typename: 'NbaTeam',
        },
        position: 'SG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203463.png',
        __typename: 'Player',
    },
    {
        id: '13831',
        fullName: 'Ben Moore',
        currentTeam: {
            abbreviation: 'SAS',
            __typename: 'NbaTeam',
        },
        position: 'F',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628500.png',
        __typename: 'Player',
    },
    {
        id: '10087',
        fullName: 'Ben Simmons',
        currentTeam: {
            abbreviation: 'PHI',
            __typename: 'NbaTeam',
        },
        position: 'PG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627732.png',
        __typename: 'Player',
    },
    {
        id: '9541',
        fullName: 'Beno Udrih',
        currentTeam: null,
        position: 'G',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2757.png',
        __typename: 'Player',
    },
]

const actions = {
    onAddPlayer: action('onAddPlayer'),
}

storiesOf('Team Builder/Suggestions Grid', module).add('default', () => (
    <SuggestionsGrid players={SuggestionsGridData} loading={false} {...actions} />
))
