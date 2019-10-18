import React from 'react'
import { storiesOf } from '@storybook/react'
import TeamStats from '../TeamStats'

const storyPath = 'Dashboard / Team Stats'

const statsData = [
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
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        {' '}
        <TeamStats stats={statsData} />
    </div>
))
