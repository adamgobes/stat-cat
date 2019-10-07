import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import SideNav from '../Nav'

storiesOf('Shared/Side Navigation', module)
    .addDecorator(StoryRouter())
    .add('open', () => <SideNav isNavOpen />)
    .add('closed', () => <SideNav isNavOpen={false} />)
