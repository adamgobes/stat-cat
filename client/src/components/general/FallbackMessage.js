import React from 'react'
import { Box, Button } from 'grommet'

import StatCatLogo from './Logo'

function FallbackMessage({ message, showReload }) {
    return (
        <Box style={{ height: '100%' }} align="center" justify="center">
            <StatCatLogo />
            <h1>{message}</h1>
            {showReload && <Button label="Reload" onClick={() => window.location.reload()} />}
        </Box>
    )
}

export default FallbackMessage
