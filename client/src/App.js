import React from 'react'
import { Grommet } from 'grommet'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

import Home from './components/presentational/Home'
import TeamBuilder from './components/container/TeamBuilder'
import LoginRegister from './components/container/LoginRegister'
import ApolloWrapper from './apollo/ApolloWrapper'

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

const isLoggedIn = () => !!cookie.load('authToken')

const App = () => (
	<ApolloWrapper>
		<Router>
			<Grommet theme={theme}>
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/teambuilder"
					render={({ history }) =>
						isLoggedIn() ? <TeamBuilder history={history} /> : <Redirect to="/auth" />
					}
				/>
				<Route exact path="/auth" component={LoginRegister} />
			</Grommet>
		</Router>
	</ApolloWrapper>
)

export default App
