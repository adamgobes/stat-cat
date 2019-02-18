import React from 'react'
import { compose, branch, renderComponent } from 'recompose'

export const loading = () => <div>loading</div>

export const renderWhileLoading = propName =>
	branch(props => props[propName] && props[propName].loading, renderComponent(loading))
