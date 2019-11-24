import React, { useState } from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled from 'styled-components'
import { Group, Dashboard, ShareOption } from 'grommet-icons'

import { ReactComponent as BasketballImage } from '../../assets/images/basketball_homepage.svg'
import HomeNav from './HomeNav'
import teambuilderScreenshot from '../../assets/images/teambuilder_screenshot.png'
import dashboardScreenshot from '../../assets/images/dashboard_screenshot.png'
import tradeScreenshot from '../../assets/images/trade_screenshot.png'
import StyledLink from '../shared/StyledLink'

const FirstBlock = styled(Box)`
    width: 100%;
    padding: 50px 0;
    margin: 100px 0;
`

const HomePageHeader = styled.h1`
    color: ${props => props.color};
    text-align: center;
    font-size: 3em;
    margin: ${props => props.margin}px;
`

const FirstBlockText = styled.p`
    width: 75%;
    text-align: center;
    font-size: 2em;
    line-height: 1.2em;
`

const SVGWrapper = styled(Box)`
    width: 300px;
    height: 300px;
`

const GetStartedButton = styled(Box)`
    width: 100px;
    text-align: center;
    background: #e17e62;
    color: white;
    margin-left: 4px;
    font-size: 1.2em;
    font-weight: bold;
    border-color: white;
    border-radius: 5px;
    padding: 10px 0;
    cursor: pointer;
`

const SecondBlock = styled(Box)`
    width: 100%;
    background: ${props => props.theme.global.colors.brand};
`

const ProductFeatureButton = styled(Box)`
    background: ${props => (props.selected ? '#e17e62' : '')};
    width: 200px;
    border-radius: 10px;
    cursor: pointer;
`

const ProductFeatureIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 2px;
    opacity: 0.8;
`

const ProductFeatureText = styled.span`
    color: white;
    font-size: 1.2em;
    font-weight: bold;
`

const ProductScreenShotWrapper = styled(Box)`
    padding: 20px;
    background: white;
    width: 90%;
    height: 600px;
`

const features = [
    {
        name: 'Team Builder',
        Icon: Group,
        screenshot: teambuilderScreenshot,
    },
    {
        name: 'Dashboard',
        Icon: Dashboard,
        screenshot: dashboardScreenshot,
    },
    {
        name: 'Trade Simulator',
        Icon: ShareOption,
        screenshot: tradeScreenshot,
    },
]

const Home = () => {
    const [currentFeature, setCurrentFeature] = useState(features[0].name)
    const [email, setEmail] = useState('')
    return (
        <Box>
            <HomeNav />
            <FirstBlock direction="row" align="center" justify="center">
                <Box direction="column" align="center" basis="1/2">
                    <HomePageHeader color="black" margin={5}>
                        Fantasy sports, your way
                    </HomePageHeader>
                    <FirstBlockText>
                        ESPN or Yahoo, rookie or seasoned vet, StatCat makes fantasy basketball
                        easier and more fun for everyone
                    </FirstBlockText>
                    <Box direction="row" align="center">
                        <TextInput
                            style={{ width: '200px' }}
                            placeholder="Enter your email address"
                            size="small"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <StyledLink
                            to={{
                                pathname: '/auth',
                                state: {
                                    isLogin: false,
                                    email,
                                },
                            }}
                            style={{ width: '100px' }}
                        >
                            <GetStartedButton>Get Started</GetStartedButton>
                        </StyledLink>
                    </Box>
                </Box>
                <SVGWrapper justify="center" align="center" basis="1/2">
                    <BasketballImage />
                </SVGWrapper>
            </FirstBlock>
            <SecondBlock direction="column" justify="between">
                <HomePageHeader color="white" margin={48}>
                    Build your team. See your stats. Simulate a trade.
                </HomePageHeader>
                <Box direction="row" justify="evenly" style={{ margin: '40px 0' }}>
                    {features.map(({ name, Icon }) => (
                        <ProductFeatureButton
                            direction="row"
                            align="center"
                            justify="center"
                            onClick={() => setCurrentFeature(name)}
                            selected={currentFeature === name}
                        >
                            <ProductFeatureIconWrapper justify="center">
                                <Icon size="medium" color="white" />
                            </ProductFeatureIconWrapper>
                            <ProductFeatureText>{name}</ProductFeatureText>
                        </ProductFeatureButton>
                    ))}
                </Box>
                <Box align="center">
                    {features.map(
                        ({ screenshot, name }) =>
                            currentFeature === name && (
                                <ProductScreenShotWrapper align="center">
                                    <img
                                        src={screenshot}
                                        height="100%"
                                        width="100%"
                                        alt="Screenshot"
                                    />
                                </ProductScreenShotWrapper>
                            )
                    )}
                </Box>
            </SecondBlock>
        </Box>
    )
}

export default Home
