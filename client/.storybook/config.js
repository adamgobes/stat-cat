import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { Grommet } from 'grommet'
import { theme } from '../src/App'

const req = require.context('../src/stories', true, /\.stories.js$/)

function loadStories() {
    req.keys().forEach(filename => req(filename))
}

function withGrommetTheme(callback) {
    return <Grommet theme={theme}>{callback()}</Grommet>
}

addDecorator(withGrommetTheme)

configure(loadStories, module)
