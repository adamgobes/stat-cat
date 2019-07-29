/*
 * File containing all Apollo related initilization logic
 */

import React from 'react'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
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

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

// component that queries user's data, writes to cache, then renders component tree
function ApolloWrapper({ children }) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
