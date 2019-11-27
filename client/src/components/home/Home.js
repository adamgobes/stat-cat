import React, { useState } from 'react'
import { Box, TextInput } from 'grommet'
import styled, { withTheme } from 'styled-components'
import { Group, Dashboard, ShareOption } from 'grommet-icons'

import { ReactComponent as BasketballImage } from '../../assets/images/basketball_homepage.svg'
import HomeNav from './HomeNav'
import teambuilderScreenshot from '../../assets/images/teambuilder_screenshot.png'
import dashboardScreenshot from '../../assets/images/dashboard_screenshot.png'
import tradeScreenshot from '../../assets/images/trade_screenshot.png'
import safariTop from '../../assets/images/safari-top.png'
import StyledLink from '../shared/StyledLink'
import Footer from './Footer'

const FirstBlock = styled(Box)`
    width: 100%;
    padding: 50px 0;
    margin: 100px 0;
    flex-direction: row;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const HomePageHeader = styled.h1`
    color: ${props => props.color};
    text-align: center;
    font-size: 3vw;
    margin: ${props => props.margin}px;
    @media (max-width: 850px) {
        font-size: 4.5vw;
        margin: 0px;
    }
`

const FirstBlockElement = styled(Box)`
    flex-basis: 50%;
    @media (max-width: 900px) {
        margin: 30px 0 0 0;
        flex-basis: 100%;
    }
`

const FirstBlockText = styled.p`
    width: 75%;
    text-align: center;
    font-size: 2em;
    line-height: 1.2em;
    @media (max-width: 600px) {
        font-size: 1.4em;
    }
`

const SVGWrapper = styled(Box)`
    width: 1300px;
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
    background: ${props => props.theme.global.colors.backdrop};
    width: 100%;
    padding: 80px 0 140px 0;
`

const ProductFeatureButton = styled(Box)`
    background: ${props => (props.selected ? props.theme.global.colors.brand : '')};
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
    color: ${props => (props.selected ? 'white' : props.theme.global.colors.brand)};
    font-size: 1.6em;
    font-weight: bold;
    @media (max-width: 750px) {
        font-size: 1em;
    }
`

const SafariTopWrapper = styled(Box)`
    width: 80%;
    @media (max-width: 750px) {
        width: 100%;
    }
`

const ProductScreenShotWrapper = styled(Box)`
    width: 80%;
    box-shadow: rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px;
    display: ${props => (!props.selected ? 'none' : '')};
    @media (max-width: 750px) {
        width: 100%;
    }
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

const Home = ({ theme }) => {
    const [currentFeature, setCurrentFeature] = useState(features[0].name)
    const [email, setEmail] = useState('')
    return (
        <Box>
            <HomeNav />
            <FirstBlock align="center" justify="center">
                <FirstBlockElement direction="column" align="center">
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
                </FirstBlockElement>
                <FirstBlockElement>
                    <SVGWrapper justify="center" align="center">
                        <BasketballImage />
                    </SVGWrapper>
                </FirstBlockElement>
            </FirstBlock>
            <SecondBlock direction="column" justify="between" align="center">
                <HomePageHeader color="black" margin={48}>
                    Build your team. See your stats. Simulate a trade.
                </HomePageHeader>
                <Box direction="row" justify="evenly" style={{ margin: '40px 0', width: '80%' }}>
                    {features.map(({ name, Icon }) => (
                        <ProductFeatureButton
                            key={name}
                            direction="row"
                            align="center"
                            justify="center"
                            onClick={() => setCurrentFeature(name)}
                            selected={currentFeature === name}
                        >
                            <ProductFeatureIconWrapper justify="center">
                                <Icon
                                    size="medium"
                                    color={
                                        currentFeature === name
                                            ? 'white'
                                            : theme.global.colors.brand
                                    }
                                />
                            </ProductFeatureIconWrapper>
                            <ProductFeatureText selected={currentFeature === name}>
                                {name}
                            </ProductFeatureText>
                        </ProductFeatureButton>
                    ))}
                </Box>
                <Box align="center">
                    <SafariTopWrapper>
                        <img src={safariTop} height="100%" width="100%" alt="safari-top" />
                    </SafariTopWrapper>
                    {features.map(({ screenshot, name }) => (
                        <ProductScreenShotWrapper
                            align="center"
                            key={name}
                            selected={name === currentFeature}
                        >
                            <img src={screenshot} height="100%" width="100%" alt="Screenshot" />
                        </ProductScreenShotWrapper>
                    ))}
                </Box>
            </SecondBlock>
            <Footer />
        </Box>
    )
}

export default withTheme(Home)