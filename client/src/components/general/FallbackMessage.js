import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import { RoundedButton } from '../shared/Buttons'
import { Title } from '../shared/TextComponents'
import StatCatLogo from './Logo'

const ErrorMessage = styled(Title)`
    color: black;
    text-align: center;
    line-height: 1.2;
    width: 70%;
`

function FallbackMessage({ message, showReload }) {
    return (
        <Box style={{ height: '100%' }} align="center" justify="center">
            <StatCatLogo />
            <ErrorMessage>{message}</ErrorMessage>
            {showReload && (
                <RoundedButton label="Reload" onClick={() => window.location.reload()} inverted />
            )}
        </Box>
    )
}

export default FallbackMessage
