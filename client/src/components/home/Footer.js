import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import StatLogo from '../../assets/images/stat-logo.png'

import { Subheader, Title } from '../general/TextComponents'

const FooterWrapper = styled(Box)`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.theme.global.colors.brand};
    padding: 30px 0;
`
const FooterItems = styled(Box)`
    width: 80%;
    @media (max-width: 700px) {
        width: 98%;
        font-size: 0.7em;
    }
`

const LogoContainer = styled(Box)`
    width: 50px;
    height: 50px;
    margin-right: 20px;
`

const FooterText = styled(Subheader)`
    color: white;
    margin: 0 30px;
    text-align: center;
`

export default function Footer() {
    return (
        <FooterWrapper align="center">
            <FooterItems direction="row" justify="between">
                <Box direction="row">
                    <Title style={{ color: 'white' }}>statcat</Title>
                </Box>
                <Box direction="row" align="center" justify="center">
                    <FooterText>Contact</FooterText>
                    <FooterText>Terms and Conditions</FooterText>
                    <FooterText>Cookie Policy</FooterText>
                </Box>
            </FooterItems>
        </FooterWrapper>
    )
}
