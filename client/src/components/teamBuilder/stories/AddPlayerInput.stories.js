import React from 'react'

import { storiesOf } from '@storybook/react'

import AddPlayerInput from '../playerSearch/AddPlayerInput'

storiesOf('Team Builder/Player Search Box', module)
    .add('empty', () => <AddPlayerInput />)
    .add('with value', () => <AddPlayerInput inputValue="lebron" />)
