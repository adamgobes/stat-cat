import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import WeeklyProjections from '../WeeklyProjections'

const projectionsData = [
    {
        category: 'PPG',
        value: '402',
    },
    {
        category: 'APG',
        value: '200',
    },
    {
        category: 'SPG',
        value: '22',
    },
    {
        category: 'RPG',
        value: '346',
    },
    {
        category: '3PM',
        value: '220',
    },
    {
        category: 'FT%',
        value: '89.3',
    },
    {
        category: 'FG%',
        value: '45.3',
    },
]

storiesOf('Dashboard/Weekly Projection', module)
    .add('no opponent', () => (
        <WeeklyProjections myProjections={projectionsData} opponentsProjection={projectionsData} />
    ))
    .add('with opponent', () => (
        <WeeklyProjections
            showOpponent
            myProjections={projectionsData}
            opponentsProjection={projectionsData}
        />
    ))
