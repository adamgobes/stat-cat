import React from 'react'

import { storiesOf } from '@storybook/react'
import PlayerStats from '../PlayerStats'
import PlayerStatsData from './dashboardStoriesData'

const storyPath = 'Dashboard/Player Stats'

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center', background: '#EFF1F3' }}>
        <PlayerStats players={PlayerStatsData} />
    </div>
))
