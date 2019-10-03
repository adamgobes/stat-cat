import React from 'react'
import { storiesOf } from '@storybook/react'

import MiniRoster from '../components/teamBuilder/teamTable/MiniRoster'

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
    {
        fullName: 'Kevin Durant',
        currentTeam: {
            abbreviation: 'BKN',
            full: 'Brooklyn Nets',
        },
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png',
        description: 'ruptured right achilles tendon',
        playingProbability: 'OUT',
    },
    {
        fullName: 'Kevon Looney',
        currentTeam: {
            abbreviation: 'GSW',
            full: 'Golden State Warriors',
        },
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626172.png',
        description: 'costal cartilage fracture',
        playingProbability: 'PROBABLE',
    },
    {
        fullName: 'Klay Thompson',
        currentTeam: {
            abbreviation: 'GSW',
            full: 'Golden State Warriors',
        },
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202691.png',
        description: 'torn ACL',
        playingProbability: 'OUT',
    },
]

storiesOf('Team Builder/Mini Roster', module).add('default', () => (
    <MiniRoster players={rosterData} />
))
