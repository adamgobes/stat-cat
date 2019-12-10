import React from 'react'
import { storiesOf } from '@storybook/react'
import TradeSimulator from '../../tradeSimulator/TradeSimulator'

const storyPath = 'Dashboard/Trade Simulator'

const searchResults = [
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
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ background: '#eff1f3', height: '100%' }}>
        <TradeSimulator searchResults={searchResults} />
    </div>
))
