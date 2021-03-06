import React, { useContext } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { TeamBuilderContextProvider } from '../teamBuilder/TeamBuilderContext'
import TeamBuilder from '../teamBuilder/TeamBuilder'
import TradeSimulator from '../tradeSimulator/TradeSimulator'
import Dashboard from '../dashboard/Dashboard'
import { AppContext, toggleNav, toggleDarkMode, closeAlert } from './AppContext'
import { useWindowDimensions } from '../../utils/customHooks'
import Nav, { NAV_WIDTH } from './Nav'
import FallbackMessage from './FallbackMessage'
import { SCREEN_SIZE_MESSAGE } from '../../utils/strings'
import Messaging from '../messaging/Messaging'
import MyLeague from '../league/MyLeague'
import Alert from './Alert'

const HIDE_NAV_WIDTH = 1100

const StatCatAppWrapper = styled.div`
    height: 100%;
    margin-left: ${props => (props.isNavOpen ? `${NAV_WIDTH}px` : '0')};
    transition: margin-left 0.3s;
`

export default function StatCatApp() {
    const { appContext, dispatch } = useContext(AppContext)
    const { width, height } = useWindowDimensions()

    const { path } = useRouteMatch()

    const isNavOpen = width < HIDE_NAV_WIDTH ? appContext.isNavOpen : true

    if (width < 800 || height < 550) {
        return <FallbackMessage message={SCREEN_SIZE_MESSAGE} />
    }

    return (
        <StatCatAppWrapper isNavOpen={isNavOpen}>
            <Nav
                setNavOpen={() => dispatch(toggleNav())}
                isNavOpen={isNavOpen}
                isWidthTooSmall={width < HIDE_NAV_WIDTH}
                darkMode={appContext.darkMode}
                toggleDarkMode={() => dispatch(toggleDarkMode())}
            />
            <Alert
                isNavOpen={isNavOpen}
                alertWidth={isNavOpen ? width - NAV_WIDTH : width}
                alertInfo={appContext.alert}
                onCloseAlert={() => dispatch(closeAlert())}
            />
            <Route
                exact
                path={`${path}/dashboard`}
                render={({ history }) => <Dashboard history={history} />}
            />
            <Route
                exact
                path={`${path}/teambuilder`}
                render={({ history }) => (
                    <TeamBuilderContextProvider>
                        <TeamBuilder history={history} />
                    </TeamBuilderContextProvider>
                )}
            />
            <Route
                exact
                path={`${path}/trade`}
                render={({ history }) => <TradeSimulator history={history} />}
            />

            <Route
                exact
                path={`${path}/league`}
                render={({ history }) => <MyLeague history={history} />}
            />

            <Route
                exact
                path={`${path}/messaging`}
                render={({ history }) => <Messaging history={history} />}
            />
        </StatCatAppWrapper>
    )
}
