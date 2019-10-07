import React from 'react'

import { storiesOf } from '@storybook/react'
import PlayerImage from '../PlayerImage'

storiesOf('Shared/Player Image', module).add('default', () => (
    <PlayerImage
        name="Kevin Durant"
        src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
    />
))
