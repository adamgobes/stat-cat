import React, { useContext } from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/general/Home'
import TeamBuilder from './components/teamBuilder/TeamBuilder'
import LoginRegister from './components/auth/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'
import Dashboard from './components/dashboard/Dashboard'
import Nav from './components/general/Nav'
import { AppContext, TOGGLE_NAV } from './components/general/AppContext'

export const theme = {
    global: {
        font: {
            family: 'Thasadith',
            size: '14px',
            height: '20px',
        },
        colors: {
            brand: '#E17E62',
            secondary: '#E9C547',
        },
    },
}

const isLoggedIn = () => !!cookie.load('authToken')

const renderComponentOrRedirect = (history, Component) =>
    isLoggedIn() ? <Component history={history} /> : <Redirect to="/auth" />

const App = () => {
    const { appContext, dispatch } = useContext(AppContext)

    return (
        <ApolloWrapper>
            <Router>
                <Grommet
                    theme={theme}
                    style={{
                        marginLeft: appContext.isNavOpen ? '250px' : '0',
                        transition: 'margin-left 0.3s',
                    }}
                >
                    <Nav
                        setNavOpen={() => dispatch({ type: TOGGLE_NAV })}
                        isNavOpen={appContext.isNavOpen}
                    />
                    <Route
                        exact
                        path="/"
                        render={({ history }) =>
                            isLoggedIn() ? (
                                <Redirect to="/teambuilder" />
                            ) : (
                                <Home history={history} />
                            )
                        }
                    />
                    <Route exact path="/auth" component={LoginRegister} />

                    <Route
                        exact
                        path="/dashboard"
                        render={({ history }) => renderComponentOrRedirect(history, Dashboard)}
                    />
                    <Route
                        exact
                        path="/teambuilder"
                        render={({ history }) => renderComponentOrRedirect(history, TeamBuilder)}
                    />
                </Grommet>
            </Router>
        </ApolloWrapper>
    )
}

export default App
