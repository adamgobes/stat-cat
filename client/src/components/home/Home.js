import React from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled from 'styled-components'

import { ReactComponent as BasketballImage } from '../../assets/images/basketball_homepage.svg'
import HomeNav from './HomeNav'

const FirstBlock = styled(Box)`
    width: 100%;
    padding: 50px 0;
    margin: 100px 0;
`

const HomePageHeader = styled.h1`
    color: ${props => props.color};
    text-align: center;
    font-size: 3em;
`

const FirstBlockText = styled.p`
    width: 75%;
    text-align: center;
    font-size: 2em;
    line-height: 1.1em;
`

const SVGWrapper = styled(Box)`
    width: 300px;
    height: 300px;
`

const GetStartedButton = styled(Button)`
    width: 200px;
    background: #e17e62;
    color: white;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    padding: 10px 0;
`

const SecondBlock = styled(Box)`
    width: 100%;
    background: ${props => props.theme.global.colors.brand};
`

const Home = () => (
    <Box>
        <HomeNav />
        <FirstBlock direction="row" align="center" justify="center">
            <Box direction="column" align="center" basis="1/2">
                <HomePageHeader color="black">The Fantasy Statistician</HomePageHeader>
                <FirstBlockText>
                    Some text Some text Some text Some text Some textadfafdafSome text Some text
                    Some text
                </FirstBlockText>
                <Box direction="row" align="center">
                    <TextInput placeholder="Enter your email address" size="small" />
                    <GetStartedButton label="Get Started" />
                </Box>
            </Box>
            <SVGWrapper justify="center" align="center" basis="1/2">
                <BasketballImage />
            </SVGWrapper>
        </FirstBlock>
        <SecondBlock direction="column">
            <HomePageHeader color="white">
                Build your team. See your stats. Simulate a trade.
            </HomePageHeader>
            <Box direction="row" justify="evenly">
                <GetStartedButton label="Team Builder" />
                <GetStartedButton label="Dashboard" />
                <GetStartedButton label="Trade Simulator" />
            </Box>
        </SecondBlock>
    </Box>
)

export default Home
