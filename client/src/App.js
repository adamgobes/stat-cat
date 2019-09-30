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
import { TeamBuilderContextProvider } from './components/teamBuilder/TeamBuilderContext'

export const theme = {
    global: {
        font: {
            family: 'Thasadith',
            size: '14px',
            height: '20px',
        },
        colors: {
            brand: '#4433F3',
            secondary: 'black',
        },
        focus: {
            border: {
                color: 'none',
            },
        },
    },
}

const isLoggedIn = () => !!cookie.load('authToken')

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
                        render={() => (isLoggedIn() ? <Redirect to="/teambuilder" /> : <Home />)}
                    />
                    <Route exact path="/auth" component={LoginRegister} />

                    <Route
                        exact
                        path="/dashboard"
                        render={() => (isLoggedIn() ? <Dashboard /> : <Redirect to="/auth" />)}
                    />
                    <Route
                        exact
                        path="/teambuilder"
                        render={() =>
                            isLoggedIn() ? (
                                <TeamBuilderContextProvider>
                                    <TeamBuilder />
                                </TeamBuilderContextProvider>
                            ) : (
                                <Redirect to="/auth" />
                            )
                        }
                    />
                </Grommet>
            </Router>
        </ApolloWrapper>
    )
}

export default App
