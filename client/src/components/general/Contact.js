import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, TextInput, TextArea } from 'grommet'
import { send } from 'emailjs-com'

import { Title, Text } from '../shared/TextComponents'
import HomeNav from '../home/HomeNav'
import { RoundedButton } from '../shared/Buttons'
import Loader from '../shared/Loader'
import Footer from '../home/Footer'

const ContactWrapper = styled(Box)`
    min-height: 100vh;
    position: relative;
    padding-bottom: 160px;
`

const ContactForm = styled(Box)`
    width: 50%;
`

const FormInput = styled(TextInput)`
    width: 100%;
    border-radius: 10px;
    margin: 10px 0px;
`

const MessageWrapper = styled(Box)`
    height: 250px;
`

const NameEmailWrapper = styled(Box)`
    width: 48%;
`

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState('')
    const [result, setResult] = useState('')

    function formValid() {
        return (
            email.length !== 0 && name.length !== 0 && subject.length !== 0 && message.length !== 0
        )
    }

    function handleFormSubmit() {
        setLoading(true)
        const templateParams = {
            subject,
            name,
            message,
            email,
        }

        send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_EMAILJS_USER_ID
        )
            .then(() => {
                setResult('Thanks! We got your message and will be in touch soon!')
                setLoading(false)
            })
            .catch(() => {
                setResult(
                    'Oops! Looks like something went wrong sending the form! Try again in a few minutes'
                )
            })
    }

    return (
        <ContactWrapper pad="large" justify="center" align="center">
            <HomeNav showButtons />
            {result.length === 0 && (
                <>
                    <Title style={{ marginTop: '70px' }}>
                        Love statcat? Hate it? Want a new feature?
                    </Title>
                    <Text style={{ margin: '-10px 0 10px 0', fontSize: '1.3em' }}>
                        Drop us a line and get in touch
                    </Text>
                    <ContactForm>
                        <Box direction="row">
                            <NameEmailWrapper style={{ marginRight: '2%' }}>
                                <FormInput
                                    size="medium"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    style={{ marginRight: '20px' }}
                                />
                            </NameEmailWrapper>
                            <NameEmailWrapper style={{ marginLeft: '2%' }}>
                                <FormInput
                                    size="medium"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </NameEmailWrapper>
                        </Box>
                        <Box>
                            <FormInput
                                size="medium"
                                name="subject"
                                placeholder="Subject"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                        </Box>
                        <MessageWrapper>
                            <TextArea
                                fill
                                name="message"
                                placeholder="Leave us your message here"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </MessageWrapper>
                        <Box align="center">
                            <RoundedButton
                                width={300}
                                inverted
                                loading={loading}
                                label="Submit"
                                disabled={!formValid()}
                                onClick={() => handleFormSubmit()}
                            />
                        </Box>
                    </ContactForm>
                </>
            )}
            {result.length !== 0 && (
                <Title style={{ marginTop: '90px', fontSize: '1.4em' }}>{result}</Title>
            )}
            <Footer />
        </ContactWrapper>
    )
}
