import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import WeeklyOverview from '../WeeklyOverview'

import { playerData } from './dashboardStoriesData'

const storyPath = 'Dashboard/Weekly Overview'

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" style={{ width: '100%', height: '100%', background: '#EFF1F3' }}>
        <WeeklyOverview data={playerData} />
    </Box>
))
