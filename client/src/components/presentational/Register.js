import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { Box, TextInput, Button } from 'grommet'
import styled, { withTheme } from 'styled-components'
import gql from 'graphql-tag'
import cookie from 'react-cookies'

const REGISTER_MUTATION = gql`
	mutation registerMutation($name: String!, $email: String!, $password: String!) {
		register(name: $name, email: $email, password: $password) {
			token
		}
	}
`

const FormInput = styled(TextInput)`
	width: 300px;
	margin: 10px 0;
	color: ${props => props.theme.global.colors.brand};
`

const RegisterButton = styled(Button)`
	background: ${props => props.theme.global.colors.brand};
	color: white;
`

function Register({ history }) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [secondPassword, setSecondPassword] = useState('')

	function handleInputChange(setFunction, value) {
		setFunction(value)
	}

	function formValid() {
		return (
			email.length !== 0 &&
			name.length !== 0 &&
			password.length !== 0 &&
			secondPassword.length !== 0 &&
			password === secondPassword
		)
	}

	function onRegisterComplete({ register }) {
		const { token } = register
		cookie.save('authToken', token, { path: '/' })
		history.push('/teambuilder')
	}

	return (
		<Box pad="large" justify="center" align="center" className="container">
			<Box pad="small">
				<FormInput
					size="medium"
					placeholder="Full Name"
					value={name}
					onChange={e => handleInputChange(setName, e.target.value)}
				/>
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
				<FormInput
					size="medium"
					placeholder="Re-enter password"
					type="password"
					value={secondPassword}
					onChange={e => handleInputChange(setSecondPassword, e.target.value)}
				/>
				<Mutation
					mutation={REGISTER_MUTATION}
					variables={{ name, email, password }}
					onCompleted={data => onRegisterComplete(data)}
				>
					{mutation => (
						<RegisterButton
							label="Register"
							onClick={mutation}
							style={{ opacity: formValid() ? 1 : 0.5 }}
							disabled={!formValid()}
						/>
					)}
				</Mutation>
			</Box>
		</Box>
	)
}

export default withTheme(Register)
