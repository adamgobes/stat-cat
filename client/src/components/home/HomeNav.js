import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'grommet'

import { TextLogo } from '../general/TextComponents'
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
    margin-left: 20px;
    font-size: 0.9em;
    padding: 6px;
    @media (max-width: 600px) {
        font-size: 1em;
    }
`

const NavItems = styled(Box)`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    @media (max-width: 400px) {
		width: 100%
		flex-direction: column;
		align-items: center;
    }
`

export default function Nav({ showButtons = true }) {
    const history = useHistory()

    return (
        <NavWrapper align="center">
            <NavItems>
                <Box direction="row">
                    <Box
                        justify="center"
                        style={{ cursor: 'pointerr' }}
                        onClick={() => history.push('/')}
                    >
                        <TextLogo color="black">statcat</TextLogo>
                    </Box>
                </Box>
                <Box style={{ visibility: !showButtons ? 'hidden' : 'visible' }}>
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
