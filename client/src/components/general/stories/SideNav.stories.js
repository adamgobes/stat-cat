import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import SideNav from '../Nav'

const storyPath = 'Shared/Side Navigation'

storiesOf(`${storyPath}`, module)
    .addDecorator(StoryRouter())
    .add('open', () => <SideNav isNavOpen setNavOpen={linkTo(`${storyPath}`, 'closed')} />)
    .add('closed', () => <SideNav isNavOpen={false} setNavOpen={linkTo(`${storyPath}`, 'open')} />)
