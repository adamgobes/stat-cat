import React from 'react'
import { Grommet } from 'grommet'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/presentational/Home'
import TeamBuilder from './components/container/TeamBuilder'

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

const client = new ApolloClient({
	uri: 'http://localhost:4000',
})

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Grommet theme={theme}>
				<Route exact path="/" component={Home} />
				<Route exact path="/teambuilder" component={TeamBuilder} />
			</Grommet>
		</Router>
	</ApolloProvider>
)

export default App
