import React from 'react'
import StoryRouter from 'storybook-react-router'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import SideNav from '../Nav'

const storyPath = 'Shared/Side Navigation'

const actions = {
    setNavOpen: action('setNavOpen'),
}

const setNavOpen = story => () => {
    actions.setNavOpen()
    linkTo(`${storyPath}`, story)()
}

storiesOf(`${storyPath}`, module)
    .addDecorator(StoryRouter())
    .add('open', () => <SideNav isNavOpen setNavOpen={setNavOpen('closed')} />)
    .add('closed', () => <SideNav isNavOpen={false} setNavOpen={setNavOpen('open')} />)
