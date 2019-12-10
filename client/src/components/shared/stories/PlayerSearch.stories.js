import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'

import AddPlayerInput from '../../teamBuilder/playerSearch/AddPlayerInput'

const storyPath = 'Shared/Player Search Input'

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large">
        <AddPlayerInput />
    </Box>
))
