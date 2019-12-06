import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, TextInput, TextArea } from 'grommet'
import { Title, Text } from './TextComponents'
import HomeNav from '../home/HomeNav'
import { RoundedButton } from './Buttons'

const ContactForm = styled(Box)``

const FormInput = styled(TextInput)`
    border-radius: 10px;
    width: 300px;
    margin: 10px 0;
`

const MessageWrapper = styled(Box)`
    height: 250px;
`

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    function formValid() {
        return (
            email.length !== 0 && name.length !== 0 && subject.length !== 0 && message.length !== 0
        )
    }

    return (
        <Box pad="large" justify="center" align="center">
            <HomeNav showButtons={false} />
            <Title style={{ marginTop: '40px' }}>Love statcat? Hate it? Want a new feature?</Title>
            <Text style={{ margin: '-10px 0 10px 0', fontSize: '1.3em' }}>Drop us a line</Text>
            <ContactForm>
                <FormInput
                    size="medium"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <FormInput
                    size="medium"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FormInput
                    size="medium"
                    name="subject"
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                />
                <MessageWrapper>
                    <TextArea
                        fill
                        name="message"
                        placeholder="Leave us your message here"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                </MessageWrapper>
                <RoundedButton inverted label="Submit" disabled={!formValid()} />
            </ContactForm>
        </Box>
    )
}
