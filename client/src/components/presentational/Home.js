import React from 'react'
import { Box, Button } from 'grommet'
import styled from 'styled-components'

import StatLogo from '../../assets/images/stat-logo.png'
import StyledLink from './shared/StyledLink'

const LogoContainer = styled(Box)`
	width: 100px;
	height: 100px;
	margin-right: 20px;
`

const Description = styled.h1`
	text-align: center;
	font-size: 2em;
	line-height: 34px;
	font-weight: 500;
	width: 400px;
	margin: 60px;
`

const HomeButton = styled(Button)`
	margin: 0 10px;
`

const Header = styled.h1`
	color: ${props => props.theme.global.colors.brand};
	font-size: 3em;
`

const Home = () => (
	<Box pad="large">
		<Box direction="row" justify="center">
			<LogoContainer justify="center">
				<img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
			</LogoContainer>
			<Box justify="center">
				<Header>StatCat</Header>
			</Box>
		</Box>
		<Box direction="row" justify="center">
			<Description>The fantasy basketball statistician you&apos;ll love to use</Description>
		</Box>
		<Box align="center" justify="center">
			<Box direction="row" align="center">
				<StyledLink to="/auth">
					<HomeButton
						label="Sign Up"
						primary
						style={{ color: 'white', fontWeight: 'bold' }}
					/>
				</StyledLink>

				<StyledLink to="/teambuilder">
					<HomeButton label="Continue as Guest" />
				</StyledLink>
			</Box>
		</Box>
	</Box>
)

export default Home
