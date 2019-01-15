import React from 'react'
import styled, { withTheme } from 'styled-components'
import { Box, Button, Menu } from 'grommet'

import StyledLink from './shared/StyledLink'
import StatLogo from '../../assets/images/stat-logo.png'

const LogoContainer = styled(Box)`
    width: 60px;
    height: 60px;
    margin: 0 20px 0 0;
`

const Nav = ({ theme, showMenu, showSignUp }) => (
    <Box direction="row" justify="center" style={{ margin: '36px 0 40px 0' }}>
        <Box direction="row" justify="between" width="xlarge">
            <Box style={{ visibility: showMenu ? 'visible' : 'hidden' }}>
                <Menu
                    label="Actions"
                    items={[
                        { label: 'Launch', onClick: () => {} },
                        { label: 'Abort', onClick: () => {} },
                    ]}
                />
            </Box>
            <StyledLink to="/">
                <Box direction="row">
                    <LogoContainer direction="row">
                        <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                    </LogoContainer>
                    <h2 style={{ color: `${theme.global.colors.brand}` }}>StatCat</h2>
                </Box>
            </StyledLink>
            <Box justify="center" style={{ visibility: showMenu ? 'visible' : 'hidden' }}>
                <Button label="Sign Up" />
            </Box>
        </Box>
    </Box>
)

export default withTheme(Nav)
