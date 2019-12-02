import React from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'

import { Title, TextLogo } from '../general/TextComponents'
import { RoundedButton } from '../general/Buttons'
import StyledLink from '../shared/StyledLink'

const NavWrapper = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-bottom: 10px;
    z-index: 1000;
    background: ${props => props.theme.global.colors.brand};
`

const HomeNavButton = styled(RoundedButton)`
    width: 100px;
    margin-left: 20px;
    font-size: 0.9em;
    padding: 6px;
    @media (max-width: 600px) {
        font-size: 1em;
    }
`

const NavItems = styled(Box)`
    width: 80%;
`

export default function Nav({ showButtons = true }) {
    return (
        <NavWrapper align="center">
            <NavItems direction="row" justify="between" align="end">
                <Box direction="row">
                    <Box justify="center">
                        <TextLogo color="white">statcat</TextLogo>
                    </Box>
                </Box>
                {showButtons && (
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
                )}
            </NavItems>
        </NavWrapper>
    )
}
