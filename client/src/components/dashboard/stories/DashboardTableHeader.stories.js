import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'

import DashboardTableHeader from '../DashboardTableHeader'

const storyPath = 'Dashboard/Dashboard Table Header'

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large">
        <DashboardTableHeader
            sizes={['xsmall', 'small', 'small', 'small', 'small']}
            headers={['', 'Player Name', 'Injury', 'Playing Prob.', 'Games']}
        />
    </Box>
))
