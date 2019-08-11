import React, { useReducer, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, TextInput, Button } from 'grommet'
import styled from 'styled-components'
import cookie from 'react-cookies'

import { LOGIN_MUTATION, REGISTER_MUTATION } from '../../apollo/mutations'
import loginRegisterReducer, {
    changeInput,
    initialState,
    setErrorMessage,
    changeIsLogin,
} from './reducer'

const FormInput = styled(TextInput)`
    width: 300px;
    margin: 10px 0;
    color: ${props => props.theme.global.colors.brand};
`

const StyledButton = styled(Button)`
    background: ${props => props.theme.global.colors.brand};
    color: white;
`

function LoginRegister({ history }) {
    const [{ name, email, password, secondPassword, errorMessage, isLogin }, dispatch] = useReducer(
        loginRegisterReducer,
        initialState
    )

    const [loginUser] = useMutation(LOGIN_MUTATION, {
        variables: { email, password },
        onCompleted: data => {
            const { token } = data.login
            cookie.save('authToken', token, { path: '/' })
            history.push('/teambuilder')
        },
        onError: error => {
            dispatch(setErrorMessage(error.message))
        },
    })

    const [registerUser] = useMutation(REGISTER_MUTATION, {
        variables: {
            name,
            email,
            password,
        },
        onCompleted: data => {
            const { token } = data.register
            cookie.save('authToken', token, { path: '/' })
            history.push('/teambuilder')
        },
    })

    function handleInputChange(event) {
        dispatch(changeInput(event.target.name, event.target.value))
    }

    function formValid() {
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

    const submitForm = useCallback(() => (isLogin ? loginUser() : registerUser()), [isLogin])

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
            {errorMessage && <h1>{errorMessage}</h1>}
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
                    placeholder="password"
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
                <StyledButton
                    label={isLogin ? 'Login' : 'Register'}
                    onClick={submitForm}
                    style={{ opacity: formValid() ? 1 : 0.5 }}
                    disabled={!formValid()}
                />
            </Box>
            <Box>
                <Button
                    label={`Click here to ${isLogin ? 'Register' : 'Login'}`}
                    onClick={() => dispatch(changeIsLogin())}
                />
            </Box>
        </Box>
    )
}

export default LoginRegister
