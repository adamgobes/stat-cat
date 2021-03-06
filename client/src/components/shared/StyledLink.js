import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLinkWrapper = styled(Link)`
    text-decoration: none;
    color: inherit;
`

const StyledLink = props => <StyledLinkWrapper {...props} />

export default StyledLink
