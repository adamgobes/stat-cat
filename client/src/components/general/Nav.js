import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import cookie from 'react-cookies'
import { Menu } from 'grommet-icons'

import StyledLink from '../shared/StyledLink'
import StatLogo from '../../assets/images/stat-logo.png'

const LogoContainer = styled(Box)`
    width: 60px;
    height: 60px;
    margin: 0 20px 10px 0;
`

const HomeHeader = styled.h2`
    color: ${props => props.theme.global.colors.brand};
`

const NavigationContainer = styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    z-index: 1;
    padding: 60px 0 60px 60px;
    border-right: 1px solid black;
    overflow-x: hidden;
    transition: 0.5s;
`

const NavButton = styled(Box)`
    position: absolute;
    left: 40px;
    top: 40px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid black;
`

const DASHBOARD = 'Dashboard'
const TEAM_BUILDER = 'Team Builder'
const LOGOUT = 'Logout'

function mapUrlToPage(url) {
    switch (url) {
        case 'teambuilder':
            return 'Team Builder'
        case 'dashboard':
            return 'Dashboard'
        default:
            return ''
    }
}

function Nav({ history, isNavOpen, setNavOpen }) {
    const [currentPage, setCurrentPage] = useState(
        mapUrlToPage(window.location.pathname.substring(1))
    )

    const allPages = [
        {
            label: DASHBOARD,
            onClick: () => {
                setCurrentPage(DASHBOARD)
                history.push('/dashboard')
            },
        },
        {
            label: TEAM_BUILDER,
            onClick: () => {
                setCurrentPage(TEAM_BUILDER)
                history.push('teambuilder')
            },
        },
        {
            label: LOGOUT,
            onClick: () => {
                cookie.remove('authToken')
                history.push('/')
            },
        },
    ]

    return (
        <>
            <Box>
                {(isNavOpen && (
                    <NavigationContainer direction="column" justify="between">
                        <h1>Thing 1</h1>
                        <h1>Thing 2</h1>
                        <h1>Thing 3</h1>
                    </NavigationContainer>
                )) || (
                    <NavButton
                        direction="column"
                        justify="center"
                        align="center"
                        onClick={() => setNavOpen(!isNavOpen)}
                    >
                        <Menu size="medium" color="black" />
                    </NavButton>
                )}
            </Box>
        </>
    )
}

export default withRouter(Nav)
