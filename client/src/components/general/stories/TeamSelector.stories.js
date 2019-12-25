import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'

import TeamSelector from '../TeamSelector'

const storyPath = 'shared/Team Selector'

const teamsData = [
    {
        id: '123',
        name: 'Adam Gobran Team',
    },
    {
        id: '1234',
        name: 'Nur Al Sharif Team',
    },
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" style={{ background: '#7781f7' }}>
        <TeamSelector teams={teamsData} />
    </Box>
))
