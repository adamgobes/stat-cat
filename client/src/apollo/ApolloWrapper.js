/*
 * File containing all Apollo related initilization logic
 */

import React from 'react'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import cookie from 'react-cookies'

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

// query to fetch user's info to initialize Apollo store
const ME_QUERY = gql`
	query {
		me {
			id
			team {
				players {
					id
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
	return (
		<ApolloProvider client={client}>
			<Query query={ME_QUERY}>
				{({ loading, error, data, client: store }) => {
					if (!loading) {
						store.writeData({
							data: {
								loggedIn: data.me.id,
								userTeam: data.me.team.players.map(p => p.id),
							},
						})
						return children
					}
					return <div>Loading</div>
				}}
			</Query>
		</ApolloProvider>
	)
}

export default ApolloWrapper
