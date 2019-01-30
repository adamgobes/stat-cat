import React from 'react'
import { Box, TextInput, Button } from 'grommet'
import styled, { withTheme } from 'styled-components'

const FormInput = styled(TextInput)`
	width: 300px;
	margin: 10px 0;
	color: ${props => props.theme.global.colors.brand} !important;
`

function Login() {
	return (
		<Box pad="large" justify="center" align="center" className="container">
			<Box pad="small">
				<FormInput size="medium" placeholder="Username" />
				<FormInput size="medium" placeholder="password" type="password" />
				<Button label="Login" />
			</Box>
		</Box>
	)
}

export default withTheme(Login)
