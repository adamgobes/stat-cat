import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Box } from 'grommet'
import cookie from 'react-cookies'

import { API_URL } from './api'
import ContactList from './ContactList'
import { GET_USER_INFO_QUERY } from '../../apollo/queries'
import FallbackMessage from '../general/FallbackMessage'
import { NETWORK_ERROR_MESSAGE } from '../../utils/strings'

const ContactListWrapper = styled(Box)`
    width: 30%;
    margin-left: 30px;
`

export default function Contacts() {
    const [rawContacts, setRawContacts] = useState([])
    const [fetchingRawContacts, setFetchingRawContacts] = useState(true)

    const [hydratedContacts, setHydratedContacts] = useState([])

    const { loading: infoLoading, error: fetchInfoError } = useQuery(GET_USER_INFO_QUERY, {
        variables: { userIds: rawContacts.map(c => c.userId) },
        onCompleted: data =>
            setHydratedContacts(
                data.getUsers.map(user => ({
                    ...user,
                    ...rawContacts.find(c => c.userId === user.id),
                }))
            ),
        skip: fetchingRawContacts,
    })

    useEffect(() => {
        const token = cookie.load('authToken')
        fetch(`${API_URL}/contacts`, {
            headers: new Headers({
                Authorization: `Bearer ${token}`,
            }),
        })
            .then(res => res.json())
            .then(json => {
                setRawContacts(json.data)
                setFetchingRawContacts(false)
            })
            .catch(err => console.error(err))
    }, [])

    if (fetchInfoError) return <FallbackMessage message={NETWORK_ERROR_MESSAGE} showReload />

    return (
        <Box direction="row">
            <ContactListWrapper>
                {!infoLoading && <ContactList namesWithPreview={hydratedContacts} />}
            </ContactListWrapper>
            {!fetchingRawContacts && rawContacts.length === 0 && <h1>You have no contacts!</h1>}
        </Box>
    )
}
