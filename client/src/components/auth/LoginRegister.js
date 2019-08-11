import React, { useReducer, useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Box, TextInput, Button } from 'grommet'
import styled from 'styled-components'
import cookie from 'react-cookies'

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

const INPUT_CHANGE = 'INPUT_CHANGE'
const LOGIN_CHANGE = 'LOGIN_CHANGE'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const initialState = {
    name: '',
    email: '',
    password: '',
    secondPassword: '',
    errorMessage: null,
    isLogin: false,
}

function reducer(state, action) {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                [action.input]: action.value,
            }
        case LOGIN_CHANGE:
            return {
                ...initialState,
                isLogin: !state.isLogin,
                errorMessage: null,
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
            }
        default:
            return state
    }
}

function LoginRegister({ history }) {
    const [{ name, email, password, secondPassword, errorMessage, isLogin }, dispatch] = useReducer(
        reducer,
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
            dispatch({
                type: SET_ERROR_MESSAGE,
                payload: error.message,
            })
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
        dispatch({
            type: INPUT_CHANGE,
            input: event.target.name,
            value: event.target.value,
        })
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
                    onClick={() => dispatch({ type: LOGIN_CHANGE })}
                />
            </Box>
        </Box>
    )
}

export default LoginRegister
