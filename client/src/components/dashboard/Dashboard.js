import React from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import Nav from '../general/Nav'

const WeeklyReportWrapper = styled(Box)`
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
    background-color: ${props => props.theme.global.colors.brand};
`

const ProjectionTableWrapper = styled(Box)`
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const TopPerformersWrapper = styled(Box)`
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const SomeBox = styled(Box)`
    height: 200px;
    width: 200px;
`

const Dashboard = () => (
    <Box>
        <h1>Dashboard</h1>
    </Box>
)

export default Dashboard
