import React from 'react'
import { storiesOf } from '@storybook/react'
import TradeSimulator from '../TradeSimulator'

const storyPath = 'Dashboard/Trade Simulator'

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ background: '#eff1f3', height: '100%' }}>
        <TradeSimulator />
    </div>
))
