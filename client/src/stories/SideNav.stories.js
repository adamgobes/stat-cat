import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import SideNav from '../components/general/Nav'

storiesOf('Side Navigation', module)
    .addDecorator(StoryRouter())
    .add('default', () => <SideNav />)
