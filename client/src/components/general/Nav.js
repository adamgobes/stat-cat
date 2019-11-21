import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import { Box } from 'grommet'
import cookie from 'react-cookies'
import { useApolloClient } from '@apollo/react-hooks'
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

const NavListItem = styled(Box)`
    width: 90%;
    border-radius: 10px;
    cursor: pointer;
    margin: 0 10px;
    background: ${props => (props.selected ? 'white' : '')};
    color: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
`

const NavLinks = [
    {
        name: 'Team Builder',
        path: '/app/teambuilder',
        Icon: ({ color }) => (
            <NavIconWrapper direction="column" justify="center" align="center">
                <Group size="medium" color={color} />
            </NavIconWrapper>
        ),
    },
    {
        name: 'Dashboard',
        path: '/app/dashboard',
        Icon: ({ color }) => (
            <NavIconWrapper direction="column" justify="center" align="center">
                <Dashboard size="medium" color={color} />
            </NavIconWrapper>
        ),
    },
    {
        name: 'Trade Simulator',
        path: '/app/trade',
        Icon: ({ color }) => (
            <NavIconWrapper direction="column" justify="center" align="center">
                <ShareOption size="medium" color={color} />
            </NavIconWrapper>
        ),
    },
]

const EnhanceNavListItem = Icon => ({ name, selected, handleClick, theme }) => (
    <NavListItem direction="row" align="center" onClick={handleClick} selected={selected}>
        <Icon color={selected ? theme.global.colors.brand : 'white'} />
        <h3>{name}</h3>
    </NavListItem>
)

function Nav({ history, location, isNavOpen, setNavOpen, isWidthTooSmall, theme }) {
    const client = useApolloClient()
    const [currentPage, setCurrentPage] = useState(location.pathname)

    useEffect(() => {
        const { pathname } = location
        setCurrentPage(pathname)
    }, [location])

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
                <NavListItem direction="row" align="center" style={{ marginBottom: '12px' }}>
                    <LogoContainer justify="center">
                        <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                    </LogoContainer>
                    <Box>
                        <h1>StatCat</h1>
                    </Box>
                </NavListItem>
                {NavLinks.map(({ name, Icon, path }) => {
                    const Enhanced = EnhanceNavListItem(Icon)
                    return (
                        <Enhanced
                            name={name}
                            selected={currentPage === path}
                            handleClick={() => history.push(path)}
                            theme={theme}
                        />
                    )
                })}
                <Box style={{ height: '100px' }} />
                <NavListItem
                    direction="row"
                    align="center"
                    onClick={() => {
                        cookie.remove('authToken', { path: '/' })
                        client.cache.reset()
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

export default withRouter(withTheme(Nav))
