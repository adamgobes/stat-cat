import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Pagination from '../Pagination'

const storyPath = 'Shared/Pagination'

const actions = {
    increment: action('increment'),
    decrement: action('decrement'),
}

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" style={{ position: 'relative', width: '600px', height: '100px' }}>
        <Pagination totalPages={4} page={1} {...actions} />
    </Box>
))
