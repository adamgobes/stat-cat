import React from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'

import { Title } from '../general/TextComponents'
import { RoundedButton } from '../general/Buttons'
import StyledLink from '../shared/StyledLink'

const NavWrapper = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 10px;
    z-index: 1000;
`

const HomeNavButton = styled(RoundedButton)`
    width: 100px;
    margin: 0 0 4px 20px;
    font-size: 0.9em;
    padding: 6px;
    @media (max-width: 600px) {
        font-size: 1em;
    }
`

const NavItems = styled(Box)`
    width: 80%;
`

export default function Nav() {
    return (
        <NavWrapper align="center">
            <NavItems direction="row" justify="between" align="center">
                <Box direction="row">
                    <Box justify="center">
                        <Title>statcat</Title>
                    </Box>
                </Box>
                <Box style={{ paddingBottom: '10px' }}>
                    <Box direction="row" align="center">
                        <StyledLink
                            to={{
                                pathname: '/auth',
                                state: {
                                    isLogin: false,
                                },
                            }}
                        >
                            <HomeNavButton label="Sign Up" primary />
                        </StyledLink>
                        <StyledLink
                            to={{
                                pathname: '/auth',
                                state: {
                                    isLogin: true,
                                },
                            }}
                        >
                            <HomeNavButton label="Log In" primary />
                        </StyledLink>
                    </Box>
                </Box>
            </NavItems>
        </NavWrapper>
    )
}
