import React from 'react'
import { branch, renderComponent } from 'recompose'

export const loading = () => <div>loading</div>

export const error = () => <div>error</div>

export const renderWhileLoading = propName =>
	branch(props => props[propName] && props[propName].loading, renderComponent(loading))

export const renderError = propName =>
	branch(props => props[propName] && props[propName].error, renderComponent(error))
