import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import InjuryReport from '../blocks/InjuryReport'

const injuriesData = [
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
]

storiesOf('Dashboard/Injury Report', module).add('default', () => (
    <InjuryReport injuriesData={injuriesData} />
))