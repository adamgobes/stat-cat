import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Box, TextInput, Button } from 'grommet'
import styled from 'styled-components'
import cookie from 'react-cookies'
import { compose, withProps } from 'recompose'

import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../apollo/mutations'

const FormInput = styled(TextInput)`
    width: 300px;
    margin: 10px 0;
    color: ${props => props.theme.global.colors.brand};
`

const StyledButton = styled(Button)`
    background: ${props => props.theme.global.colors.brand};
    color: white;
`

function LoginRegister({ handleLoginUser, handleRegisterUser }) {
    const [isLogin, setIsLogin] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')

    function handleInputChange(setFunction, value) {
        setFunction(value)
    }

    function formValid() {
        return (
            (!isLogin &&
                email.length !== 0 &&
                name.length !== 0 &&
                password.length !== 0 &&
                secondPassword.length !== 0 &&
                password === secondPassword) ||
            (isLogin && email.length !== 0 && password.length !== 0)
        )
    }

    return (
        <Box pad="large" justify="center" align="center" className="container">
            <Box pad="small">
                {!isLogin && (
                    <FormInput
                        size="medium"
                        placeholder="Full Name"
                        value={name}
                        onChange={e => handleInputChange(setName, e.target.value)}
                    />
                )}
                <FormInput
                    size="medium"
                    placeholder="Email"
                    value={email}
                    onChange={e => handleInputChange(setEmail, e.target.value)}
                />
                <FormInput
                    size="medium"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={e => handleInputChange(setPassword, e.target.value)}
                />
                {!isLogin && (
                    <FormInput
                        size="medium"
                        placeholder="Re-enter password"
                        type="password"
                        value={secondPassword}
                        onChange={e => handleInputChange(setSecondPassword, e.target.value)}
                    />
                )}
                <StyledButton
                    label={isLogin ? 'Login' : 'Register'}
                    onClick={
                        isLogin
                            ? handleLoginUser({ email, password })
                            : handleRegisterUser({ name, email, password })
                    }
                    style={{ opacity: formValid() ? 1 : 0.5 }}
                    disabled={!formValid()}
                />
            </Box>
            <Box>
                <Button
                    label={`Click here to ${isLogin ? 'Register' : 'Login'}`}
                    onClick={() => setIsLogin(!isLogin)}
                />
            </Box>
        </Box>
    )
}

export default compose(
    withProps({
        handleAuthentication: (mutation, { name, email, password }) =>
            mutation({
                variables: { name, email, password },
            }),
        handleSuccess: (history, data) => {
            const isLogin = !!data.login
            const { token } = isLogin ? data.login : data.register
            cookie.save('authToken', token, { path: '/' })
            history.push('/teambuilder')
        },
    }),
    graphql(LOGIN_MUTATION, {
        name: 'loginUser',
        options: props => ({
            onCompleted: data => props.handleSuccess(props.history, data),
        }),
        props: ({ loginUser, ownProps: { handleAuthentication } }) => ({
            handleLoginUser: ({ email, password }) => () =>
                handleAuthentication(loginUser, { email, password }),
        }),
    }),
    graphql(REGISTER_MUTATION, {
        name: 'registerUser',
        options: props => ({
            onCompleted: ({ data }) => props.handleSuccess({ history: props.history, data }),
        }),
        props: ({ registerUser, ownProps: { handleAuthentication } }) => ({
            handleRegisterUser: ({ name, email, password }) => () =>
                handleAuthentication(registerUser, { name, email, password }),
        }),
    })
)(LoginRegister)
