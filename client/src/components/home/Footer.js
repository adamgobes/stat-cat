import React from 'react'
import { useHistory } from 'react-router-dom'
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
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 700px) {
        width: 98%;
        font-size: 0.7em;
    }
`

const FooterText = styled(Subheader)`
    color: white;
    margin: 0 30px;
    text-align: center;
    cursor: pointer;
    @media (max-width: 400) {
        font-size: 0.5em;
    }
`

function Footer() {
    const history = useHistory()

    return (
        <FooterWrapper align="center">
            <FooterItems direction="row" justify="between">
                <Box direction="row">
                    <TextLogo color="white">statcat</TextLogo>
                </Box>
                <Box direction="row" align="center" justify="center">
                    <Box onClick={() => history.push('/about')}>
                        <FooterText>About Us</FooterText>
                    </Box>
                    <Box onClick={() => history.push('/contact')}>
                        <FooterText>Contact Us</FooterText>
                    </Box>
                </Box>
            </FooterItems>
        </FooterWrapper>
    )
}

export default Footer
