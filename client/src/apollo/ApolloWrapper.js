/*
 * File containing all Apollo related initilization logic
 */

import React, { useContext } from 'react'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import cookie from 'react-cookies'

import { StoreContext } from '../App'

const httpLink = createHttpLink({
	uri: 'http://localhost:4000',
})

// link to attach auth header to each request
const authLink = setContext((_, { headers }) => {
	const token = cookie.load('authToken')

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	}
})

// query to fetch user's info to initialize mobx store
const ME_QUERY = gql`
	query {
		me {
			id
			team {
				players {
					id
					fullName
					currentTeam {
						abbreviation
					}
					position
					imageSrc
				}
			}
		}
	}
`

// initialize store values
const defaults = {
	loggedIn: '',
	userTeam: [],
}

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	clientState: {
		defaults,
	},
})

// component that queries user's data, writes to store, then renders component tree
function ApolloWrapper({ children }) {
	const store = useContext(StoreContext)
	return (
		<ApolloProvider client={client}>
			<Query query={ME_QUERY}>
				{({ loading, error, data }) => {
					if (!loading) {
						store.setUserTeam(data.me.team.players)
						store.setLoggedIn(data.me.id)
						return children
					}
					return <div>Loading</div>
				}}
			</Query>
		</ApolloProvider>
	)
}

export default ApolloWrapper
