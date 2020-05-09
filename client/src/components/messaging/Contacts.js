import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import cookie from 'react-cookies'

import { API_URL } from './api'
import ContactList from './ContactList'

const ContactListWrapper = styled(Box)`
    width: 30%;
`

export default function Contacts() {
    const [contacts, setContacts] = useState([])

    const token = cookie.load('authToken')
    useEffect(() => {
        fetch(`${API_URL}/contacts`, {
            headers: new Headers({
                Authorization: `Bearer ${token}`,
            }),
        })
            .then(res => res.json())
            .then(json => setContacts(json.data))
            .catch(err => console.log(err))
    })

    return (
        <Box direction="row">
            <ContactListWrapper>
                <ContactList
                    contacts={contacts.map(c => ({
                        name: c.userId,
                        messagePreview: c.messagePreview,
                    }))}
                />
            </ContactListWrapper>
        </Box>
    )
}
