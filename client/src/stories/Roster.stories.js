import React from 'react'
import { storiesOf } from '@storybook/react'

import Roster from '../components/teamBuilder/teamTable/Roster'

const rosterData = [
    {
        id: '10087',
        fullName: 'Ben Simmons',
        currentTeam: {
            abbreviation: 'PHI',
            full: 'Philadelphia 76ers',
            __typename: 'NbaTeam',
        },
        position: 'PG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627732.png',
    },
    {
        id: '9458',
        fullName: 'Ben McLemore',
        currentTeam: {
            abbreviation: 'SAC',
            full: 'Sacremento Kings',
            __typename: 'NbaTeam',
        },
        position: 'SG',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203463.png',
        __typename: 'Player',
    },
]

storiesOf('Team Builder/Roster', module).add('default', () => <Roster players={rosterData} />)
