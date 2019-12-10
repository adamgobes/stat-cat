import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { suggestionsGridData } from './teamBuilderStoriesData'
import SuggestionsGrid from '../playerSearch/SuggestionsGrid'

const actions = {
    onAddPlayer: action('onAddPlayer'),
}

storiesOf('Team Builder/Suggestions Grid', module).add('default', () => (
    <SuggestionsGrid players={suggestionsGridData} loading={false} {...actions} />
))
