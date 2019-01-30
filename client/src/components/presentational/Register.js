import React from 'react'
import { Box, TextInput, Button } from 'grommet'
import styled, { withTheme } from 'styled-components'

const FormInput = styled(TextInput)`
	width: 300px;
	margin: 10px 0;
	color: ${props => props.theme.global.colors.brand} !important;
`

function Register() {
	return (
		<Box pad="large" justify="center" align="center" className="container">
			<Box pad="small">
				<FormInput size="medium" placeholder="Username" />
				<FormInput size="medium" placeholder="password" type="password" />
				<FormInput size="medium" placeholder="Re-enter password" type="password" />
				<Button label="Register" />
			</Box>
		</Box>
	)
}

export default withTheme(Register)
