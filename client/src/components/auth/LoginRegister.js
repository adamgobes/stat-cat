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
    const [state, dispatch] = useReducer(reducer, initialState)

    const [loginUser] = useMutation(LOGIN_MUTATION, {
        variables: { email: state.email, password: state.password },
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
            name: state.name,
            email: state.email,
            password: state.password,
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
            (!state.isLogin &&
                state.email.length !== 0 &&
                state.name.length !== 0 &&
                state.password.length !== 0 &&
                state.secondPassword.length !== 0 &&
                state.password.length === state.secondPassword.length) ||
            (state.isLogin && state.email.length !== 0 && state.password.length !== 0)
        )
    }

    const submitForm = useCallback(() => (state.isLogin ? loginUser() : registerUser()), [
        state.isLogin,
    ])

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
            {state.errorMessage && <h1>{state.errorMessage}</h1>}
            <Box pad="small">
                {!state.isLogin && (
                    <FormInput
                        name="name"
                        size="medium"
                        placeholder="Full Name"
                        value={state.name}
                        onChange={handleInputChange}
                    />
                )}
                <FormInput
                    size="medium"
                    name="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={handleInputChange}
                />
                <FormInput
                    size="medium"
                    name="password"
                    placeholder="password"
                    value={state.password}
                    type="password"
                    onChange={handleInputChange}
                />
                {!state.isLogin && (
                    <FormInput
                        size="medium"
                        name="secondPassword"
                        placeholder="Re-enter password"
                        value={state.secondPassword}
                        type="password"
                        onChange={handleInputChange}
                    />
                )}
                <StyledButton
                    label={state.isLogin ? 'Login' : 'Register'}
                    onClick={submitForm}
                    style={{ opacity: formValid() ? 1 : 0.5 }}
                    disabled={!formValid()}
                />
            </Box>
            <Box>
                <Button
                    label={`Click here to ${state.isLogin ? 'Register' : 'Login'}`}
                    onClick={() => dispatch({ type: LOGIN_CHANGE })}
                />
            </Box>
        </Box>
    )
}

export default LoginRegister
