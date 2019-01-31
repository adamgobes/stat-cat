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

const LOGIN_MUTATION = gql`
	mutation loginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`

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

	function onFormComplete(data) {
		const { token } = isLogin ? data.login : data.register
		cookie.save('authToken', token, { path: '/' })
		history.push('/teambuilder')
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
				<Mutation
					mutation={isLogin ? LOGIN_MUTATION : REGISTER_MUTATION}
					variables={{ name, email, password }}
					onCompleted={data => onFormComplete(data)}
				>
					{mutation => (
						<StyledButton
							label={isLogin ? 'Login' : 'Register'}
							onClick={mutation}
							style={{ opacity: formValid() ? 1 : 0.5 }}
							disabled={!formValid()}
						/>
					)}
				</Mutation>
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

export default withTheme(LoginRegister)
