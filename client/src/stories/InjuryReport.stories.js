import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import InjuryReport from '../components/dashboard/blocks/InjuryReport'

storiesOf('Dashboard/Injury Report', module).add('default', () => <InjuryReport />)
