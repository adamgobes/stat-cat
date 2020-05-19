import React, { useContext } from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/home/Home'
import Contact from './components/general/Contact'
import LoginRegister from './components/auth/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'
import { lightTheme, darkTheme } from './theme'
import StatCatApp from './components/general/StatCatApp'
import About from './components/general/About'
import { AppContext } from './components/general/AppContext'

const App = () => {
    const isLoggedIn = () => !!cookie.load('authToken')

    const { appContext, dispatch } = useContext(AppContext)

    return (
        <ApolloWrapper>
            <Router>
                <Grommet theme={appContext.darkMode ? darkTheme : lightTheme}>
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

                    <Route path="/app" component={StatCatApp} />
                </Grommet>
            </Router>
        </ApolloWrapper>
    )
}

export default App
