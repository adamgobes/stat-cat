import React from 'react'

import { storiesOf } from '@storybook/react'
import PlayerStats from '../PlayerStats'

const storyPath = 'Dashboard/Player Stats'

const PlayerStatsData = [
    {
        fullName: 'Kevin Durant',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png',
        description: 'ruptured right achilles tendon',
        playingProbability: 'OUT',
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
        fullName: 'Kevon Looney',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626172.png',
        description: 'costal cartilage fracture',
        playingProbability: 'PROBABLE',
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
        fullName: 'Klay Thompson',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202691.png',
        description: 'torn ACL',
        playingProbability: 'OUT',
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
        fullName: 'Ben Simmons',
        description: 'torn ACL',
        playingProbability: 'OUT',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627732.png',
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
        fullName: 'Ben McLemore',
        description: 'torn ACL',
        playingProbability: 'OUT',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203463.png',
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
        fullName: 'Dragan Bender',
        description: 'N/A',
        playingProbability: 'HEALTHY',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627733.png',
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
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        <PlayerStats data={PlayerStatsData} />
    </div>
))
