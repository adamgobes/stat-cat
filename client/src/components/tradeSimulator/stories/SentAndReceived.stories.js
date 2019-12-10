import React from 'react'
import { Box } from 'grommet'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import SentAndReceived from '../SentAndReceived'
import { sentPlayers, receivedPlayers } from './tradeSimulatorStoriesData'

const storyPath = 'Trade Simulator/Sent and Received'

const actions = {
    onRemovePlayer: action('onRemovePlayer'),
}

storiesOf(`${storyPath}`, module)
    .add('Sent', () => (
        <Box pad="large" style={{ background: '#EFF1F3', width: '100%', height: '100%' }}>
            <SentAndReceived title="Sent" players={sentPlayers} {...actions} />
        </Box>
    ))
    .add('Received', () => (
        <Box pad="large" style={{ background: '#EFF1F3', width: '100%', height: '100%' }}>
            <SentAndReceived title="Received" players={receivedPlayers} {...actions} />
        </Box>
    ))
