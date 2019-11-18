import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from 'grommet'
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
    FormPreviousLink,
    ShareOption,
} from 'grommet-icons'
import Toggle from '../shared/Toggle'

import StatLogo from '../../assets/images/stat-logo.png'

const LogoContainer = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 20px 10px 0;
`

const NavigationContainer = styled(Box)`
    background: ${props => props.theme.global.colors.brand};
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ isNavOpen }) => (isNavOpen ? '180px' : '0')};
    z-index: 1;
    padding: ${({ isNavOpen }) => (isNavOpen ? '60px 0 60px 10px' : '0')};
    border-right: ${({ isNavOpen }) => (isNavOpen ? 'none' : 'none')};
    overflow-x: hidden;
    transition: 0.3s;
    font-size: 0.8em;
    border-top-right-radius: 10px;
`

const ToggleNavButton = styled(Box)`
    position: absolute;
    left: ${({ isNavOpen }) => (isNavOpen ? '290px' : '40px')};
    top: 20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid black;
    transition: 0.3s;
    z-index: 1000;
`

const NavIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 2px;
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
    cursor: pointer;
    margin: 0 10px;
`

function Nav({ history, isNavOpen, setNavOpen, isWidthTooSmall }) {
    const [currentPage, setCurrentPage] = useState(
        mapUrlToPage(window.location.pathname.substring(1))
    )

    function handleNavLinkClick(path) {
        history.push(path)
    }

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
        <Box>
            {isWidthTooSmall && (
                <ToggleNavButton
                    direction="column"
                    justify="center"
                    align="center"
                    onClick={() => setNavOpen(!isNavOpen)}
                    isNavOpen={isNavOpen}
                >
                    {!isNavOpen && <Menu size="medium" color="black" />}
                    {isNavOpen && <FormPreviousLink size="medium" color="black" />}
                </ToggleNavButton>
            )}

            <NavigationContainer
                direction="column"
                align="start"
                justify="evenly"
                isNavOpen={isNavOpen}
            >
                <NavListItem
                    direction="row"
                    align="center"
                    style={{ marginBottom: '12px' }}
                    onClick={() => handleNavLinkClick('/')}
                >
                    <LogoContainer justify="center">
                        <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                    </LogoContainer>
                    <Box>
                        <h1>StatCat</h1>
                    </Box>
                </NavListItem>
                <NavListItem
                    direction="row"
                    align="center"
                    onClick={() => handleNavLinkClick('/teambuilder')}
                >
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Group size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Team Builder</h3>
                </NavListItem>
                <NavListItem
                    direction="row"
                    align="center"
                    onClick={() => handleNavLinkClick('/dashboard')}
                >
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Dashboard size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Dashboard</h3>
                </NavListItem>
                <NavListItem
                    direction="row"
                    align="center"
                    onClick={() => handleNavLinkClick('/trade')}
                >
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <ShareOption size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Trade Simulator</h3>
                </NavListItem>
                {/* <NavListItem direction="row" align="center" >
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Trophy size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>My League</h3>
                </NavListItem> */}
                {/* <NavListItem direction="row" align="center">
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Configure size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Settings</h3>
                </NavListItem> */}
                <NavListItem direction="row" align="center">
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Info size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Dark Mode</h3>
                    {/* <Toggle /> */}
                </NavListItem>

                <Box style={{ height: '100px' }} />

                <NavListItem direction="row" align="center">
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <CircleInformation size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>About</h3>
                </NavListItem>
                <NavListItem direction="row" align="center">
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Help size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Help</h3>
                </NavListItem>

                <Box style={{ height: '100px' }} />

                <NavListItem
                    direction="row"
                    align="center"
                    onClick={() => {
                        cookie.remove('authToken')
                        history.push('/')
                    }}
                >
                    <NavIconWrapper direction="column" justify="center" align="center">
                        <Logout size="medium" color="white" />
                    </NavIconWrapper>
                    <h3>Logout</h3>
                </NavListItem>
            </NavigationContainer>
        </Box>
    )
}

export default withRouter(Nav)
