import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import { RoundedButton } from '../Buttons'

const storyPath = 'General/Buttons'

storiesOf(`${storyPath}`, module)
    .add('Default', () => (
        <Box pad="large">
            <RoundedButton width={200} label="Simulate Trade" />
        </Box>
    ))
    .add('Inverted', () => (
        <Box pad="large">
            <RoundedButton width={200} inverted label="Simulate Trade" />
        </Box>
    ))
