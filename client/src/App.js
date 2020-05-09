import React from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/home/Home'
import Contact from './components/general/Contact'
import LoginRegister from './components/auth/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'
import theme from './theme'
import StatCatApp from './components/general/StatCatApp'
import About from './components/general/About'
import Contacts from './components/messaging/Contacts'

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
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/messaging" component={Contacts} />

                    <Route path="/app" component={StatCatApp} />
                </Grommet>
            </Router>
        </ApolloWrapper>
    )
}

export default App
