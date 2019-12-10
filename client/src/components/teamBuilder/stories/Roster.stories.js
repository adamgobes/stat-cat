import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { rosterData } from './teamBuilderStoriesData'

import Roster from '../teamTable/Roster'

const actions = {
    onRemovePlayer: action('onRemovePlayer'),
    onSaveTeam: action('onSaveTeam'),
}

storiesOf('Team Builder/Roster', module).add('default', () => (
    <div style={{ width: '50%', height: '100%' }}>
        <Roster players={rosterData} {...actions} />
    </div>
))
