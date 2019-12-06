import React, { useContext } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { TeamBuilderContextProvider } from '../teamBuilder/TeamBuilderContext'
import TeamBuilder from '../teamBuilder/TeamBuilder'
import TradeSimulator from '../dashboard/TradeSimulator'
import Dashboard from '../dashboard/Dashboard'
import { TOGGLE_NAV, AppContext } from './AppContext'
import { useWindowDimensions } from '../../utils/customHooks'
import Nav from './Nav'
import FallbackMessage from './FallbackMessage'
import { SCREEN_SIZE_MESSAGE } from '../../utils/strings'

const HIDE_NAV_WIDTH = 1100

const StatCatAppWrapper = styled.div`
    height: 100%;
    margin-left: ${props => (props.isNavOpen ? '180px' : '0')};
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
                setNavOpen={() => dispatch({ type: TOGGLE_NAV })}
                isNavOpen={isNavOpen}
                isWidthTooSmall={width < HIDE_NAV_WIDTH}
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
        </StatCatAppWrapper>
    )
}
