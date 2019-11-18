import React, { useContext } from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/general/Home'
import TeamBuilder from './components/teamBuilder/TeamBuilder'
import LoginRegister from './components/auth/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'
import Dashboard from './components/dashboard/Dashboard'
import TradeSimulator from './components/dashboard/TradeSimulator'
import { AppContext } from './components/general/AppContext'
import { TeamBuilderContextProvider } from './components/teamBuilder/TeamBuilderContext'
import theme from './theme'
import { useWindowDimensions } from './utils/customHooks'

const isLoggedIn = () => !!cookie.load('authToken')

const App = () => {
    const { appContext, dispatch } = useContext(AppContext)
    const { height, width } = useWindowDimensions()

    if (width < 800 || height < 550) {
        return <div>hi</div>
    }

    return (
        <ApolloWrapper>
            <Router>
                <Grommet
                    theme={theme}
                    style={{
                        marginLeft: appContext.isNavOpen ? '380px' : '0',
                        transition: 'margin-left 0.3s',
                    }}
                >
                    {/* <Nav
                        setNavOpen={() => dispatch({ type: TOGGLE_NAV })}
                        isNavOpen={appContext.isNavOpen}
                    /> */}
                    <Route
                        exact
                        path="/"
                        render={() => (isLoggedIn() ? <Redirect to="/teambuilder" /> : <Home />)}
                    />
                    <Route exact path="/auth" component={LoginRegister} />

                    <Route
                        exact
                        path="/dashboard"
                        render={({ history }) =>
                            isLoggedIn() ? <Dashboard history={history} /> : <Redirect to="/auth" />
                        }
                    />
                    <Route
                        exact
                        path="/teambuilder"
                        render={({ history }) =>
                            isLoggedIn() ? (
                                <TeamBuilderContextProvider>
                                    <TeamBuilder history={history} />
                                </TeamBuilderContextProvider>
                            ) : (
                                <Redirect to="/auth" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/trade"
                        render={({ history }) =>
                            isLoggedIn() ? (
                                <TradeSimulator history={history} />
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
