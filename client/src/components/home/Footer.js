import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import StatLogo from '../../assets/images/stat-logo.png'

const FooterWrapper = styled(Box)`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.theme.global.colors.brand};
    padding: 30px 0;
`
const FooterItems = styled(Box)`
    width: 70%;
`

const LogoContainer = styled(Box)`
    width: 50px;
    height: 50px;
    margin-right: 20px;
`

const FooterText = styled.h2`
    color: white;
    margin: 0 20px;
`

export default function Footer() {
    return (
        <FooterWrapper align="center">
            <FooterItems direction="row" justify="between">
                <Box direction="row">
                    <LogoContainer justify="center">
                        <img src={StatLogo} alt="Stat Logo" height="100%" width="100%" />
                    </LogoContainer>
                </Box>
                <Box direction="row" align="center">
                    <FooterText>Contact Us</FooterText>
                    <FooterText>Terms and Conditions</FooterText>
                    <FooterText>Cookie Policy</FooterText>
                </Box>
            </FooterItems>
        </FooterWrapper>
    )
}
