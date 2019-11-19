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

const StatCatAppWrapper = styled.div`
    height: 100%;
    margin-left: ${props => (props.isNavOpen ? '180px' : '0')};
    transition: margin-left 0.3s;
`

export default function StatCatApp() {
    const { appContext, dispatch } = useContext(AppContext)
    const { width } = useWindowDimensions()

    const { path } = useRouteMatch()

    const isNavOpen = width < 900 ? appContext.isNavOpen : true

    return (
        <StatCatAppWrapper isNavOpen={isNavOpen}>
            <Nav
                setNavOpen={() => dispatch({ type: TOGGLE_NAV })}
                isNavOpen={isNavOpen}
                isWidthTooSmall={width < 900}
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
