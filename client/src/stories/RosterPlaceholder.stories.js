import React from 'react'
import { storiesOf } from '@storybook/react'

import RosterPlaceholder from '../components/teamBuilder/teamTable/RosterPlaceholder'

const playerData = {
    id: '10087',
    fullName: 'Ben Simmons',
    currentTeam: {
        abbreviation: 'PHI',
        full: 'Philidelphia 76ers',
    },
    position: 'PG',
    imageSrc:
        'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627732.png',
}

storiesOf('Team Builder/Roster Placeholder', module)
    .add('selected', () => <RosterPlaceholder selected playerData={playerData} />)
    .add('not selected', () => <RosterPlaceholder selected={false} />)
