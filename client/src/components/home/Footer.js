import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import { Subheader, TextLogo } from '../general/TextComponents'

const FooterWrapper = styled(Box)`
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background: ${props => props.theme.global.colors.brand};
    padding: 36px 0;
`
const FooterItems = styled(Box)`
    width: 80%;
    @media (max-width: 700px) {
        width: 98%;
        font-size: 0.7em;
    }
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
                    <TextLogo color="white">statcat</TextLogo>
                </Box>
                <Box direction="row" align="center" justify="center">
                    <FooterText>About Us</FooterText>
                    <FooterText>Contact Us</FooterText>
                </Box>
            </FooterItems>
        </FooterWrapper>
    )
}
