import React from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'

import StatLogo from '../../assets/images/stat-logo.png'
import StyledLink from '../shared/StyledLink'

const LogoContainer = styled(Box)`
    width: 50px;
    height: 50px;
    margin-right: 20px;
`

const NavWrapper = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 20px;
    z-index: 1000;
`

const HomeButton = styled(Button)`
    margin: 0 10px;
    color: white;
    font-weight: bold;
    @media (max-width: 600px) {
        font-size: 1em;
    }
`

const Header = styled.h1`
    color: ${props => props.theme.global.colors.brand};
    font-size: 2em;
`

const NavItems = styled(Box)`
    width: 80%;
`

export default function Nav() {
    return (
        <NavWrapper align="center">
            <NavItems direction="row" justify="between" align="center">
                <Box direction="row">
                    <LogoContainer justify="center">
                        <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                    </LogoContainer>
                    <Box justify="center">
                        <Header>StatCat</Header>
                    </Box>
                </Box>
                <Box>
                    <Box direction="row" align="center">
                        <StyledLink
                            to={{
                                pathname: '/auth',
                                state: {
                                    isLogin: false,
                                },
                            }}
                        >
                            <HomeButton label="Sign Up" primary />
                        </StyledLink>
                        <StyledLink
                            to={{
                                pathname: '/auth',
                                state: {
                                    isLogin: true,
                                },
                            }}
                        >
                            <HomeButton label="Log In" primary />
                        </StyledLink>
                    </Box>
                </Box>
            </NavItems>
        </NavWrapper>
    )
}