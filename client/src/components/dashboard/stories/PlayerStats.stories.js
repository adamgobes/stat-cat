import React from 'react'

import { storiesOf } from '@storybook/react'
import PlayerStats from '../PlayerStats'

const storyPath = 'Dashboard/Player Stats'

const PlayerStatsData = [
    {
        id: '9369',
        firstName: 'Carmelo',
        lastName: 'Anthony',
        fullName: 'Carmelo Anthony',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2546.png',
        stats: [
            {
                category: 'FGA',
                value: 5.7,
            },
            {
                category: 'FGM',
                value: 2.8,
            },
            {
                category: 'FTA',
                value: 2.2,
            },
            {
                category: 'FTM',
                value: 1.5,
            },
            {
                category: 'RPG',
                value: 5.4,
            },
            {
                category: 'APG',
                value: 0.5,
            },
            {
                category: 'PPG',
                value: 13.4,
            },
            {
                category: 'SPG',
                value: 0.4,
            },
            {
                category: 'BPG',
                value: 0.7,
            },
            {
                category: 'TPG',
                value: 0.8,
            },
        ],
    },
    {
        id: '9158',
        firstName: 'LeBron',
        lastName: 'James',
        fullName: 'LeBron James',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png',
        stats: [
            {
                category: 'FGA',
                value: 14,
            },
            {
                category: 'FGM',
                value: 8.1,
            },
            {
                category: 'FTA',
                value: 7.6,
            },
            {
                category: 'FTM',
                value: 5.1,
            },
            {
                category: 'RPG',
                value: 8.5,
            },
            {
                category: 'APG',
                value: 8.3,
            },
            {
                category: 'PPG',
                value: 27.4,
            },
            {
                category: 'SPG',
                value: 1.3,
            },
            {
                category: 'BPG',
                value: 0.6,
            },
            {
                category: 'TPG',
                value: 3.6,
            },
        ],
    },
    {
        id: '9325',
        firstName: 'Giannis',
        lastName: 'Antetokounmpo',
        fullName: 'Giannis Antetokounmpo',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203507.png',
        stats: [
            {
                category: 'FGA',
                value: 14.5,
            },
            {
                category: 'FGM',
                value: 9.3,
            },
            {
                category: 'FTA',
                value: 9.5,
            },
            {
                category: 'FTM',
                value: 6.9,
            },
            {
                category: 'RPG',
                value: 12.5,
            },
            {
                category: 'APG',
                value: 5.9,
            },
            {
                category: 'PPG',
                value: 27.7,
            },
            {
                category: 'SPG',
                value: 1.3,
            },
            {
                category: 'BPG',
                value: 1.5,
            },
            {
                category: 'TPG',
                value: 3.7,
            },
        ],
    },
    {
        id: '9386',
        firstName: 'Kevin',
        lastName: 'Durant',
        fullName: 'Kevin Durant',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png',
        stats: [
            {
                category: 'FGA',
                value: 12.8,
            },
            {
                category: 'FGM',
                value: 7.5,
            },
            {
                category: 'FTA',
                value: 6.5,
            },
            {
                category: 'FTM',
                value: 5.7,
            },
            {
                category: 'RPG',
                value: 6.4,
            },
            {
                category: 'APG',
                value: 5.9,
            },
            {
                category: 'PPG',
                value: 26,
            },
            {
                category: 'SPG',
                value: 0.8,
            },
            {
                category: 'BPG',
                value: 1.1,
            },
            {
                category: 'TPG',
                value: 2.9,
            },
        ],
    },
    {
        id: '9161',
        firstName: 'Kevin',
        lastName: 'Love',
        fullName: 'Kevin Love',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201567.png',
        stats: [
            {
                category: 'FGA',
                value: 6.2,
            },
            {
                category: 'FGM',
                value: 2.5,
            },
            {
                category: 'FTA',
                value: 5.2,
            },
            {
                category: 'FTM',
                value: 4.7,
            },
            {
                category: 'RPG',
                value: 10.9,
            },
            {
                category: 'APG',
                value: 2.2,
            },
            {
                category: 'PPG',
                value: 17,
            },
            {
                category: 'SPG',
                value: 0.3,
            },
            {
                category: 'BPG',
                value: 0.3,
            },
            {
                category: 'TPG',
                value: 1.9,
            },
        ],
    },
    {
        id: '15206',
        firstName: 'Kevin',
        lastName: 'Knox',
        fullName: 'Kevin Knox',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628995.png',
        stats: [
            {
                category: 'FGA',
                value: 7.3,
            },
            {
                category: 'FGM',
                value: 2.8,
            },
            {
                category: 'FTA',
                value: 3,
            },
            {
                category: 'FTM',
                value: 2.2,
            },
            {
                category: 'RPG',
                value: 4.5,
            },
            {
                category: 'APG',
                value: 1.1,
            },
            {
                category: 'PPG',
                value: 12.8,
            },
            {
                category: 'SPG',
                value: 0.6,
            },
            {
                category: 'BPG',
                value: 0.3,
            },
            {
                category: 'TPG',
                value: 1.5,
            },
        ],
    },
    {
        id: '9232',
        firstName: 'James',
        lastName: 'Harden',
        fullName: 'James Harden',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201935.png',
        stats: [
            {
                category: 'FGA',
                value: 11.3,
            },
            {
                category: 'FGM',
                value: 6,
            },
            {
                category: 'FTA',
                value: 11,
            },
            {
                category: 'FTM',
                value: 9.7,
            },
            {
                category: 'RPG',
                value: 6.6,
            },
            {
                category: 'APG',
                value: 7.5,
            },
            {
                category: 'PPG',
                value: 36.1,
            },
            {
                category: 'SPG',
                value: 2,
            },
            {
                category: 'BPG',
                value: 0.7,
            },
            {
                category: 'TPG',
                value: 5,
            },
        ],
    },
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        <PlayerStats data={PlayerStatsData} />
    </div>
))
