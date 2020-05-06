import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import Contacts from './Contacts'

const storyPath = 'Messaging/Contacts'

storiesOf(`${storyPath}`, module).add('Default', () => (
    <Box pad="large" style={{ width: '100%', height: '100%', background: '#EFF1F3' }}>
        <Contacts />
    </Box>
))
