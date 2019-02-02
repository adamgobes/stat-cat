import React from 'react'
import { Grommet } from 'grommet'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/presentational/Home'
import TeamBuilder from './components/container/TeamBuilder'
import LoginRegister from './components/container/LoginRegister'

const theme = {
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

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})
const authLink = setContext((_, { headers }) => {
	const token = cookie.load('authToken')

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
})

const isLoggedIn = () => !!cookie.load('authToken')

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Grommet theme={theme}>
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/teambuilder"
					render={() => (isLoggedIn() ? <TeamBuilder /> : <Redirect to="/auth" />)}
				/>
				<Route exact path="/auth" component={LoginRegister} />
			</Grommet>
		</Router>
	</ApolloProvider>
)

export default App
