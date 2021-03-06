import React, { useState, useContext } from 'react'
import { Box, TextInput } from 'grommet'
import styled, { ThemeContext } from 'styled-components'
import { Group, Dashboard, ShareOption } from 'grommet-icons'

import { ReactComponent as BasketballImage } from '../../assets/images/basketball_homepage.svg'
import HomeNav from './HomeNav'
import teambuilderScreenshot from '../../assets/images/teambuilder_screenshot.png'
import dashboardScreenshot from '../../assets/images/dashboard_screenshot.png'
import tradeScreenshot from '../../assets/images/trade_screenshot.png'
import safariTop from '../../assets/images/safari-top.png'
import StyledLink from '../shared/StyledLink'
import Footer from './Footer'
import { Title, Text, Subheader } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'

const HomeWrapper = styled(Box)`
    position: relative;
`

const FirstBlock = styled(Box)`
    width: 100%;
    padding: 50px 0 10px 0;
    margin: 100px 0;
    flex-direction: row;
    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const HomePageHeader = styled(Title)`
    color: ${props => props.color};
    text-align: center;
    font-size: 1.9em;
    margin: ${props => props.margin}px;
    @media (max-width: 850px) {
        font-size: 1.4em;
        margin: 0px;
    }
    @media (max-width: 400px) {
        font-size: 0.7em;
    }
`

const FirstBlockElement = styled(Box)`
    flex-basis: 50%;
    @media (max-width: 900px) {
        margin: 30px 0 0 0;
        flex-basis: 100%;
    }
`

const FirstBlockText = styled(Text)`
    width: 75%;
    text-align: center;
    font-size: 1.4em;
    line-height: 1.2em;
    margin-bottom: 24px;
    @media (max-width: 400px) {
        font-size: 0.6em;
    }
`

const SVGWrapper = styled(Box)`
    width: 1300px;
    height: 300px;
    @media (max-width: 400px) {
        width: 1300px;
        height: 200px;
    }
`

const GetStartedInput = styled(TextInput)`
    width: 240px;
    border-radius: 10px;
    @media (max-width: 400px) {
        width: 120px;
        font-size: 0.6em;
    }
`

const GetStartedButton = styled(RoundedButton)`
    width: 120px;
    margin: 0 0 4px 20px;
    font-size: 0.9em;
    padding: 8px;
    @media (max-width: 400px) {
        width: 80px;
        font-size: 0.6em;
    }
`

const SecondBlock = styled(Box)`
    background: ${props => props.theme.global.colors.backdrop};
    width: 100%;
    padding: 40px 0 180px 0;
`

const ProductFeatureButtonsWrapper = styled(Box)`
    width: 80%;
    margin: 14px 0 40px 0;
`

const ProductFeatureButton = styled(Box)`
    background: ${props => (props.selected ? props.theme.global.colors.brand : '')};
    width: 200px;
    border-radius: 14px;
    cursor: pointer;
`

const ProductFeatureIconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    margin: 0 2px;
    opacity: 0.8;
`

const ProductFeatureHeader = styled(Subheader)`
    color: ${props => (props.selected ? 'white' : props.theme.global.colors.brand)};
    font-size: 1em;
    font-weight: bold;
    @media (max-width: 750px) {
        font-size: 0.7em;
    }
    @media (max-width: 400px) {
        font-size: 0em;
    }
`

const SafariTopWrapper = styled(Box)`
    width: 80%;
    @media (max-width: 750px) {
        width: 100%;
    }
    @media (max-width: 400px) {
        width: 90%;
    }
`

const ProductScreenShotWrapper = styled(Box)`
    width: 80%;
    box-shadow: rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px;
    display: ${props => (!props.selected ? 'none' : '')};
    @media (max-width: 750px) {
        width: 100%;
    }
    @media (max-width: 400px) {
        width: 90%;
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

const Home = () => {
    const theme = useContext(ThemeContext)

    const [currentFeature, setCurrentFeature] = useState(features[0].name)
    const [email, setEmail] = useState('')
    return (
        <HomeWrapper>
            <HomeNav />
            <FirstBlock align="center" justify="center">
                <FirstBlockElement direction="column" align="center">
                    <HomePageHeader color="black" margin={20}>
                        Fantasy sports, your way
                    </HomePageHeader>
                    <FirstBlockText>
                        ESPN or Yahoo, rookie or seasoned vet, statcat makes fantasy basketball
                        easier and more fun for everyone
                    </FirstBlockText>
                    <Box direction="column">
                        <Box direction="row">
                            <GetStartedInput
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
                                <GetStartedButton inverted label="Get Started" />
                            </StyledLink>
                        </Box>
                        <Box>
                            <Text style={{ opacity: '0.8', fontSize: '0.7em' }}>
                                Already using statcat? &nbsp;
                                <StyledLink
                                    to={{
                                        pathname: '/auth',
                                        state: {
                                            isLogin: true,
                                        },
                                    }}
                                    style={{ textDecoration: 'underline' }}
                                >
                                    Sign in
                                </StyledLink>
                            </Text>
                        </Box>
                    </Box>
                </FirstBlockElement>
                <FirstBlockElement>
                    <SVGWrapper justify="center" align="center">
                        <BasketballImage />
                    </SVGWrapper>
                </FirstBlockElement>
            </FirstBlock>
            <SecondBlock direction="column" justify="between" align="center">
                <HomePageHeader color="black">
                    Build your team. See your stats. Simulate a trade.
                </HomePageHeader>
                <ProductFeatureButtonsWrapper direction="row" justify="evenly">
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
                            <ProductFeatureHeader selected={currentFeature === name}>
                                {name}
                            </ProductFeatureHeader>
                        </ProductFeatureButton>
                    ))}
                </ProductFeatureButtonsWrapper>
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
        </HomeWrapper>
    )
}

export default Home
