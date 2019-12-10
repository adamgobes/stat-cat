import React from 'react'
import { Box } from 'grommet'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import MyStats from '../MyStats'
import { averagesData, playerData } from './dashboardStoriesData'

const storyPath = 'Dashboard/My Stats'

const actions = {
    setSelectedTimeFrame: action('setSelectedTimeFrame'),
}

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" style={{ width: '100%', height: '100%', background: '#EFF1F3' }}>
        <MyStats
            averages={averagesData}
            players={playerData}
            timeFrames={{
                showTimeFrames: true,
                selectedTimeFrame: 'All',
                setSelectedTimeFrame: actions.setSelectedTimeFrame,
            }}
        />
    </Box>
))
