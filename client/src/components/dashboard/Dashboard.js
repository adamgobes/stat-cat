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
        <Grid
            style={{ margin: '0 40px' }}
            rows={['1/2', '1/2']}
            columns={['2/5', 'flex']}
            gap="small"
            areas={[
                { name: 'weeklyReport', start: [0, 0], end: [0, 1] },
                { name: 'projections', start: [1, 0], end: [1, 0] },
                { name: 'topPerformers', start: [1, 1], end: [1, 1] },
            ]}
        >
            <WeeklyReportWrapper gridArea="weeklyReport">
                <SomeBox />
            </WeeklyReportWrapper>
            <ProjectionTableWrapper gridArea="projections">
                <SomeBox />
            </ProjectionTableWrapper>
            <TopPerformersWrapper gridArea="topPerformers">
                <SomeBox />
            </TopPerformersWrapper>
        </Grid>
    </Box>
)

export default Dashboard
