import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import RosterPlaceholder from './RosterPlaceholder'

function Roster() {
    const team = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    return (
        <Box style={{ width: '100%', height: '100%', background: '#FAFAFA' }} justify="center">
            <Box direction="row" justify="center" wrap>
                {team.map(e => (
                    <RosterPlaceholder />
                ))}
            </Box>
        </Box>
    )
}

export default Roster
