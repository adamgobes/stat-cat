import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AddPlayerInput from '../playerSearch/AddPlayerInput'

const actions = {
    onPlayerInputChange: action('onPlayerInputChange'),
}

storiesOf('Team Builder/Player Search Box', module).add('default', () => (
    <AddPlayerInput {...actions} />
))
