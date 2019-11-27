import React from 'react'
import styled from 'styled-components'
import { Box, Button } from 'grommet'

import StatCatLogo from './Logo'

const ErrorMessage = styled.h1`
    text-align: center;
    line-height: 1.2;
    width: 70%;
`

function FallbackMessage({ message, showReload }) {
    return (
        <Box style={{ height: '100%' }} align="center" justify="center">
            <StatCatLogo />
            <ErrorMessage>{message}</ErrorMessage>
            {showReload && <Button label="Reload" onClick={() => window.location.reload()} />}
        </Box>
    )
}

export default FallbackMessage
