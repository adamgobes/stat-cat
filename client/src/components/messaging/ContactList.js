import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
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
    border-radius: 12px;
    margin: 20px 0;
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
    margin-top: 10px;
    color: black;
    margin-left: 20px;
`

const SentTime = styled(Text)`
    position: absolute;
    right: 48px;
    top: 30px;
    color: #c3c5cd;
`

const MessagePreview = styled(Subheader)`
    width: 60%;
    margin: 10px 0;
    color: #c3c5cd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export default function ContactList({ contacts }) {
    return (
        <ContactListWrapper>
            <ContactsList direction="column">
                {contacts.map(contact => (
                    <Contact direction="row" align="center">
                        <AvatarWrapper direction="column" justify="center" align="center">
                            <Avatar size="50" align="center" justify="center" background="#7781f7">
                                <Text style={{ color: 'white', fontSize: '1em' }}>
                                    {contact.name.substring(0, 1)}
                                </Text>
                            </Avatar>
                        </AvatarWrapper>
                        <ContactInformation direction="column" justify="center">
                            <Title style={{ color: 'black', fontSize: '1.2em', margin: '0px' }}>
                                {contact.name}
                            </Title>
                            <MessagePreview>{contact.messagePreview}</MessagePreview>
                        </ContactInformation>
                        <SentTime>12 min</SentTime>
                    </Contact>
                ))}
            </ContactsList>
        </ContactListWrapper>
    )
}
