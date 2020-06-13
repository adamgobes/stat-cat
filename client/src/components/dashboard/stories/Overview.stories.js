import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import Overview from '../Overview'

const storyPath = 'Dashboard/Overview'

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" style={{ width: '100%', height: '100%', background: '#EFF1F3' }}>
        <Overview />
    </Box>
))
