import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import WeeklyOverview from '../WeeklyOverview'

const storyPath = 'Dashboard/Weekly Overview'

const actions = {}

const WeeklyOverviewData = [
    {
        fullName: 'Kevin Durant',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png',
        description: 'ruptured right achilles tendon',
        playingProbability: 'OUT',
    },
    {
        fullName: 'Kevon Looney',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626172.png',
        description: 'costal cartilage fracture',
        playingProbability: 'PROBABLE',
    },
    {
        fullName: 'Klay Thompson',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202691.png',
        description: 'torn ACL',
        playingProbability: 'OUT',
    },
    {
        fullName: 'Ben Simmons',
        description: 'torn ACL',
        playingProbability: 'OUT',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627732.png',
    },
    {
        fullName: 'Ben McLemore',
        description: 'torn ACL',
        playingProbability: 'OUT',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203463.png',
    },
    {
        fullName: 'Dragan Bender',
        description: 'N/A',
        playingProbability: 'HEALTHY',
        imageSrc:
            'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627733.png',
    },
]

storiesOf(`${storyPath}`, module).add('default', () => (
    <div style={{ textAlign: 'center' }}>
        <WeeklyOverview data={WeeklyOverviewData} />
    </div>
))
