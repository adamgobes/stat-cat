import React, { useReducer, useCallback, useMemo } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, TextInput, Button } from 'grommet'
import styled from 'styled-components'
import cookie from 'react-cookies'

import { Title, Text } from '../general/TextComponents'
import { RoundedButton } from '../general/Buttons'
import Loader from '../shared/Loader'
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../apollo/mutations'
import loginRegisterReducer, {
    changeInput,
    createInitialState,
    setErrorMessage,
    changeIsLogin,
} from './reducer'
import HomeNav from '../home/HomeNav'

const FormInput = styled(TextInput)`
    border-radius: 10px;
    width: 300px;
    margin: 10px 0;
    color: ${props => props.theme.global.colors.brand};
`

const StyledButton = styled(Button)`
    background: ${props => props.theme.global.colors.brand};
    color: white;
`

function LoginRegister({ history, location }) {
    const initialIsLogin = location.state ? location.state.isLogin : false
    const initialEmail = location.state ? location.state.email : ''

    const [{ name, email, password, secondPassword, errorMessage, isLogin }, dispatch] = useReducer(
        loginRegisterReducer,
        createInitialState({
            initialIsLogin,
            initialEmail,
        })
    )

    const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
        variables: { email, password },
        onCompleted: data => {
            const { token } = data.login
            cookie.save('authToken', token, { path: '/' })
            history.push('/app/dashboard')
        },
        onError: error => {
            dispatch(setErrorMessage(error.graphQLErrors[0].message))
        },
    })

    const [registerUser, { loading: registerLoading }] = useMutation(REGISTER_MUTATION, {
        variables: {
            name,
            email,
            password,
        },
        onCompleted: data => {
            const { token } = data.register
            cookie.save('authToken', token, { path: '/' })
            history.push('/app/teambuilder')
        },
        onError: error => {
            dispatch(setErrorMessage(error.graphQLErrors[0].message))
        },
    })

    function handleInputChange(event) {
        dispatch(changeInput(event.target.name, event.target.value))
    }

    function formValid() {
        console.log('formValid')
        return (
            (!isLogin &&
                email.length !== 0 &&
                name.length !== 0 &&
                password.length !== 0 &&
                secondPassword.length !== 0 &&
                password.length === secondPassword.length) ||
            (isLogin && email.length !== 0 && password.length !== 0)
        )
    }

    const submitForm = useCallback(() => (isLogin ? loginUser() : registerUser()), [
        isLogin,
        loginUser,
        registerUser,
    ])

    const submitButtonString = useMemo(() => (isLogin ? 'Log in' : 'Register'), [isLogin])

    function handleEnterClicked(event) {
        switch (event.keyCode) {
            case 13:
                return submitForm()
            default:
                return null
        }
    }

    return (
        <Box
            pad="large"
            justify="center"
            align="center"
            className="container"
            onKeyDown={handleEnterClicked}
        >
            <HomeNav showButtons={false} />
            <Title>{`${isLogin ? 'Log in' : 'Create an Account'}`}</Title>
            <Text style={{ marginTop: '-10px' }}>
                {!isLogin && `You're just a step away from fantasy domination`}
                {isLogin && `Welcome back!`}
            </Text>
            {errorMessage && <Title>{errorMessage}</Title>}
            <Box pad="small">
                {!isLogin && (
                    <FormInput
                        name="name"
                        size="medium"
                        placeholder="Full Name"
                        value={name}
                        onChange={handleInputChange}
                    />
                )}
                <FormInput
                    size="medium"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                />
                <FormInput
                    size="medium"
                    name="password"
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={handleInputChange}
                />
                {!isLogin && (
                    <FormInput
                        size="medium"
                        name="secondPassword"
                        placeholder="Re-enter password"
                        value={secondPassword}
                        type="password"
                        onChange={handleInputChange}
                    />
                )}
                <Box align="center">
                    <RoundedButton
                        inverted
                        label={
                            loginLoading || registerLoading ? (
                                <Loader size={20} />
                            ) : (
                                submitButtonString
                            )
                        }
                        onClick={submitForm}
                        style={{ opacity: formValid() ? 1 : 0.5, width: '200px' }}
                        disabled={!formValid()}
                    />
                </Box>
            </Box>
            <Box>
                <Text style={{ opacity: '0.5' }} onClick={() => dispatch(changeIsLogin())}>
                    {`Click here to ${isLogin ? 'register' : 'login'}`}
                </Text>
            </Box>
        </Box>
    )
}

export default LoginRegister
