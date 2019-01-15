import React from 'react'
import styled from 'styled-components'
import { Box, Button, Menu } from 'grommet'

import Logo from './Logo'
import StatLogo from '../../assets/images/stat-logo.png'

const LogoContainer = styled(Box)`
    width: 60px;
    height: 60px;
    margin: 0 20px 0 0;
`

const Nav = () => (
    <Box direction="row" justify="center" style={{ margin: '36px 0 40px 0' }}>
        <Box direction="row" justify="between" width="xlarge">
            <Box>
                <Button>Sign Up</Button>
            </Box>
			<Box direction="row">
                <LogoContainer direction="row">
                    <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                </LogoContainer>
				<h2 style={{ color: '#e17e62' }}>StatCat</h2>
            </Box>
            <Box>
                <Menu
                    label="Actions"
                    items={[
                        { label: 'Launch', onClick: () => {} },
                        { label: 'Abort', onClick: () => {} },
                    ]}
                />
            </Box>
        </Box>
    </Box>
)

export default Nav
