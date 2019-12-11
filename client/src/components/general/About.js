import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import HomeNav from '../home/HomeNav'
import Footer from '../home/Footer'
import { Title, Text } from '../shared/TextComponents'

const AboutWrapper = styled(Box)`
    position: relative;
    padding: 180px 0px;
    min-height: 100vh;
`

const AboutTitle = styled(Title)`
    color: ${props => props.theme.global.colors.brand};
    width: 600px;
`

const AboutUsText = styled(Text)`
    width: 600px;
    text-align: left;
    font-size: 1.2em;
    line-height: 1.6;
`

export default function About() {
    return (
        <AboutWrapper>
            <HomeNav showButtons />
            <Box align="center">
                <Box align="center">
                    <AboutTitle>About us</AboutTitle>
                    <AboutUsText>
                        Let's leave the spreadsheets to the people on Wall Street. Statcat was built
                        to help fantasy experts and novices alike easily manage their rosters and
                        make decisions based on numbers, not hunches. Although statcat is starting
                        with just basketball, we have football, baseball, and hockey in the works.
                    </AboutUsText>
                </Box>
            </Box>
            <Footer />
        </AboutWrapper>
    )
}
