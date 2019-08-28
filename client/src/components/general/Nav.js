import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Button, Menu } from 'grommet'

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

const DASHBOARD = 'Dashboard'
const TEAM_BUILDER = 'Team Builder'

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

function Nav({ showMenu = true, showSignUp = false, history }) {
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
    ]

    return (
        <Box direction="row" justify="center" style={{ margin: '36px 0 10px 0' }}>
            <Box direction="row" justify="between" width="xlarge">
                <Box style={{ visibility: showMenu ? 'visible' : 'hidden' }}>
                    <Menu
                        label={currentPage}
                        items={allPages.filter(p => p.label !== currentPage)}
                    />
                </Box>
                <StyledLink to="/">
                    <Box direction="row">
                        <LogoContainer direction="row">
                            <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                        </LogoContainer>
                        <HomeHeader>StatCat</HomeHeader>
                    </Box>
                </StyledLink>
                <Box justify="center" style={{ visibility: showSignUp ? 'visible' : 'hidden' }}>
                    <StyledLink to="/auth">
                        <Button label="Sign Up" />
                    </StyledLink>
                </Box>
            </Box>
        </Box>
    )
}

export default withRouter(Nav)
