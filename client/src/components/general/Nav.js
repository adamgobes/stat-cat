import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'
import { Box } from 'grommet'
import cookie from 'react-cookies'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import {
    Menu,
    Group,
    Dashboard,
    Logout,
    ShareOption,
    FormClose,
    Info,
    Achievement,
} from 'grommet-icons'

import { Subheader, TextLogo } from '../shared/TextComponents'
import TeamSelector from './TeamSelector'
import { ALL_MY_TEAMS_QUERY } from '../../apollo/queries'
import Loader from '../shared/Loader'
import Toggle from '../shared/Toggle'

export const NAV_WIDTH = 200

const NavigationContainer = styled(Box)`
    background: ${props => props.theme.global.colors.brand};
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ isNavOpen }) => (isNavOpen ? `${NAV_WIDTH}px` : '0')};
    z-index: 1;
    padding: ${({ isNavOpen }) => (isNavOpen ? '60px 0 60px 10px' : '0')};
    border-right: ${({ isNavOpen }) => (isNavOpen ? 'none' : 'none')};
    overflow-x: hidden;
    transition: 0.3s;
    font-size: 0.8em;
`

const ToggleNavButton = styled(Box)`
    position: absolute;
    cursor: pointer;
    left: ${({ isNavOpen }) => (isNavOpen ? '126px' : '40px')};
    top: 20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    transition: 0.3s;
    z-index: 1000;
`

const NavIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 2px;
`

const NavListHeader = styled(Subheader)`
    color: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    font-size: 0.9em;
`

const NavListItem = styled(Box)`
    width: 88%;
    border-radius: 10px;
    cursor: pointer;
    margin: 0 4px;
    background: ${props => (props.selected ? 'white' : '')};
`

const DarkModeToggle = styled(NavListItem)`
    margin-top: 40px;
    margin-left: -4px;
`

const Moon = styled(Box)`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    box-shadow: 8px 5px 0 0 white;
    margin-left: -10px;
    margin-top: -8px;
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
    {
        name: 'My League',
        path: '/app/league',
        Icon: ({ color }) => (
            <NavIconWrapper direction="column" justify="center" align="center">
                <Achievement size="medium" color={color} />
            </NavIconWrapper>
        ),
    },
]

const EnhanceNavListItem = Icon => ({ name, selected, handleClick, theme }) => (
    <NavListItem direction="row" align="center" onClick={handleClick} selected={selected}>
        <Icon color={selected ? theme.global.colors.brand : 'white'} />
        <NavListHeader selected={selected}>{name}</NavListHeader>
    </NavListItem>
)

function Nav({ isNavOpen, setNavOpen, isWidthTooSmall, darkMode, toggleDarkMode }) {
    const history = useHistory()
    const location = useLocation()
    const theme = useContext(ThemeContext)

    const client = useApolloClient()
    const [currentPage, setCurrentPage] = useState(location.pathname)

    const { data: myTeamsData, loading } = useQuery(ALL_MY_TEAMS_QUERY)

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
                    {isNavOpen && <FormClose size="medium" color="white" />}
                </ToggleNavButton>
            )}

            <NavigationContainer
                direction="column"
                align="start"
                justify="evenly"
                isNavOpen={isNavOpen}
            >
                <NavListItem direction="row" align="center" style={{ margin: '0px' }}>
                    <Box align="center" style={{ width: '100%' }}>
                        <TextLogo>statcat</TextLogo>
                    </Box>
                </NavListItem>
                <NavListItem>
                    {loading && <Loader size="20" />}
                    {!loading && <TeamSelector teams={myTeamsData.me.teams} />}
                </NavListItem>
                {NavLinks.map(({ name, Icon, path }) => {
                    const Enhanced = EnhanceNavListItem(Icon)
                    return (
                        <Enhanced
                            key={name}
                            name={name}
                            selected={currentPage === path}
                            handleClick={() => history.push(path)}
                            theme={theme}
                        />
                    )
                })}
                <DarkModeToggle direction="row" justify="evenly">
                    <Box align="center">
                        <Info color="white" />
                    </Box>
                    <Toggle handleToggle={toggleDarkMode} isToggled={darkMode} />
                    <Moon />
                </DarkModeToggle>
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
                    <NavListHeader>Logout</NavListHeader>
                </NavListItem>
            </NavigationContainer>
        </Box>
    )
}

export default Nav
