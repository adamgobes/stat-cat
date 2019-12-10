import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TradeSearch from '../TradeSearch'

import { suggestionsGridData } from '../../teamBuilder/stories/teamBuilderStoriesData'

const storyPath = 'Trade Simulator/Trade Search'

const actions = {
    handleInputChange: action('handleInputChange'),
    onSendPlayer: action('onSendPlayer'),
    onReceivePlayer: action('onReceivePlayer'),
}

storiesOf(`${storyPath}`, module).add('default', () => (
    <Box pad="large" align="center">
        <TradeSearch
            searchValue="green"
            suggestions={suggestionsGridData}
            sendablePlayers={['9228']}
            {...actions}
        />
    </Box>
))
