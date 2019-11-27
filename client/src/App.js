import React from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/home/Home'
import LoginRegister from './components/auth/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'
import theme from './theme'
import StatCatApp from './components/general/StatCatApp'

const App = () => {
    const isLoggedIn = () => !!cookie.load('authToken')

    return (
        <ApolloWrapper>
            <Router>
                <Grommet theme={theme}>
                    <Route
                        exact
                        path="/"
                        render={() =>
                            isLoggedIn() ? (
                                <Redirect to="/app/dashboard" />
                            ) : (
                                <Redirect to="/home" />
                            )
                        }
                    />
                    <Route exact path="/auth" component={LoginRegister} />
                    <Route exact path="/home" component={Home} />

                    <Route path="/app" component={StatCatApp} />
                </Grommet>
            </Router>
        </ApolloWrapper>
    )
}

export default App
