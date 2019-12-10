import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'

import Loader from '../Loader'

const storyPath = 'Shared/Loader'

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large">
        <Loader size={50} />
    </Box>
))
