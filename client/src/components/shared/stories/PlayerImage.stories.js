import React from 'react'
import { Box } from 'grommet'

import { storiesOf } from '@storybook/react'
import PlayerImage from '../PlayerImage'

storiesOf('Shared/Player Image', module).add('default', () => (
    <Box pad="large">
        <PlayerImage
            name="Kevin Durant"
            src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
        />
    </Box>
))
