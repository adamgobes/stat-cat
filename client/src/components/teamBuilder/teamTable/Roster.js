import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import RosterPlaceholder from './RosterPlaceholder'

const ROSTER_SIZE = 12

function Roster({ players }) {
    const team = [...players, ...new Array(ROSTER_SIZE - players.length)]
    return (
        <Box style={{ width: '100%', height: '100%' }} justify="center">
            <Box direction="row" justify="center" wrap>
                {team.map((player, i) => (
                    <RosterPlaceholder playerData={player} key={i} />
                ))}
            </Box>
        </Box>
    )
}

export default Roster
