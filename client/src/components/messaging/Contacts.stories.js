import React from 'react'
import { Box } from 'grommet'
import { storiesOf } from '@storybook/react'
import ContactList from './ContactList'

const storyPath = 'Messaging/ContactList'

const contactListData = {
    data: [
        {
            name: 'Adam Gobran',
            messagePreview: 'hey! I saw that you have some pretty good rebounders on your team.',
        },
        {
            name: 'Nur Al Sharif',
            messagePreview: 'hey! what do you thinkg of trading Lebron for Harden?',
        },
    ],
}

storiesOf(`${storyPath}`, module).add('Default', () => (
    <Box pad="large" style={{ width: '100%', height: '100%', background: '#EFF1F3' }}>
        <ContactList contacts={contactListData.data} />
    </Box>
))
