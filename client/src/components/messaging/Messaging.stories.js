import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import Messaging from './Messaging'

const storyPath = 'Messaging'

storiesOf(`${storyPath}`, module).add('Default', () => (
    <Box pad="large">
        <Messaging />
    </Box>
))
