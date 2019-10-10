import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import WeeklyOverview from '../WeeklyOverview'

const storyPath = 'Dashboard/Weekly Overview'

const actions = {}

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        <WeeklyOverview />
    </div>
))
