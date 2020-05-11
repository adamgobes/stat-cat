import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import moment from 'moment'

import { Subheader, Text, Title } from '../shared/TextComponents'

const ContactListWrapper = styled(Box)`
    background: ${props => props.theme.global.colors.backdrop};
`

const ContactsList = styled(Box)`
    height: 100%;
`

const Contact = styled(Box)`
    position: relative;
    background: white;
    border-radius: 6px;
    margin: 4px 0;
    min-height: 100px;
    padding: 20px;
    cursor: pointer;
    box-shadow: rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px;
    &:hover {
        opacity: 0.7;
    }
`

const AvatarWrapper = styled(Box)`
    height: 100%;
    width: 25%;
`

const Avatar = styled(Box)`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 100%;
    background: ${props => props.background};
`

const ContactInformation = styled(Box)`
    height: 100%;
    width: 64%;
    margin-top: 6px;
    color: black;
    margin-left: 10px;
`

const SentTime = styled(Text)`
    position: absolute;
    right: 24px;
    top: 35px;
    color: #c3c5cd;
    font-size: 0.7em;
`

const ContactName = styled(Title)`
    color: black;
    font-size: 0.8em;
    margin: 0px;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const MessagePreview = styled(Subheader)`
    width: 60%;
    margin: 0px;
    font-size: 0.7em;
    color: #c3c5cd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const formatDate = date => {
    const dateStr = moment(date).fromNow()
    return dateStr.substring(0, dateStr.length - 3)
}

export default function ContactList({ namesWithPreview }) {
    return (
        <ContactListWrapper>
            <ContactsList direction="column">
                {namesWithPreview.map(contact => (
                    <Contact direction="row" align="center" key={contact.id}>
                        <AvatarWrapper direction="column" justify="center" align="center">
                            <Avatar size="40" align="center" justify="center" background="#7781f7">
                                <Text style={{ color: 'white', fontSize: '1em' }}>
                                    {contact.name.substring(0, 1)}
                                </Text>
                            </Avatar>
                        </AvatarWrapper>
                        <ContactInformation direction="column" justify="center">
                            <ContactName>{contact.name}</ContactName>
                            <MessagePreview>{contact.messagePreview}</MessagePreview>
                        </ContactInformation>
                        <SentTime>{formatDate(contact.sentAt)}</SentTime>
                    </Contact>
                ))}
            </ContactsList>
        </ContactListWrapper>
    )
}
