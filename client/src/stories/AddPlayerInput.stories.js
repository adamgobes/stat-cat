import React from 'react'

import { storiesOf } from '@storybook/react'

import AddPlayerInput from '../components/teamBuilder/playerSearch/AddPlayerInput'

storiesOf('Team Builder/Player Search Box', module)
    .add('default', () => <AddPlayerInput />)
    .add('something', () => <AddPlayerInput inputValue="lebron" />)
