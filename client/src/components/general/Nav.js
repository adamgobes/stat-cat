import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import cookie from 'react-cookies'
import {
    Menu,
    Group,
    Dashboard,
    Trophy,
    Configure,
    Info,
    CircleInformation,
    Help,
    Logout,
} from 'grommet-icons'
import Toggle from '../shared/Toggle'

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
    padding: 60px 0 60px 10px;
    border-right: 1px solid black;
    overflow-x: hidden;
    transition: 0.5s;
`

const OpenNavButton = styled(Box)`
    position: absolute;
    left: 40px;
    top: 40px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid black;
`

const NavIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 10px;
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

const NavListItem = styled(Box)`
    margin: 0 10px;
`

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
                    <NavigationContainer direction="column" justify="evenly">
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Group size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>Team Builder</h3>
                        </NavListItem>
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Dashboard size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>Dashboard</h3>
                        </NavListItem>
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Trophy size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>My League</h3>
                        </NavListItem>
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Configure size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>Settings</h3>
                        </NavListItem>
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Info size="medium" color="black" />
                            </NavIconWrapper>
                            <h3 style={{ marginRight: '10px' }}>Dark Mode</h3>
                            <Toggle />
                        </NavListItem>

                        <Box style={{ height: '100px' }} />

                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <CircleInformation size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>About StatCat</h3>
                        </NavListItem>
                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Help size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>Help</h3>
                        </NavListItem>

                        <Box style={{ height: '100px' }} />

                        <NavListItem direction="row" align="center">
                            <NavIconWrapper direction="column" justify="center" align="center">
                                <Logout size="medium" color="black" />
                            </NavIconWrapper>
                            <h3>Logout</h3>
                        </NavListItem>
                    </NavigationContainer>
                )) || (
                    <OpenNavButton
                        direction="column"
                        justify="center"
                        align="center"
                        onClick={() => setNavOpen(!isNavOpen)}
                    >
                        <Menu size="medium" color="black" />
                    </OpenNavButton>
                )}
            </Box>
        </>
    )
}

export default withRouter(Nav)
