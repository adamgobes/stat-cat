import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import StatCatLogo from './Logo'

export default function ResponsiveFallback() {
    return (
        <Box style={{ height: '100%' }} align="center" justify="center">
            <StatCatLogo />
            <h1>Oops! StatCat does not a screen size that small yet!</h1>
        </Box>
    )
}
