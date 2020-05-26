import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ConnectLeague from './ConnectLeague'

const MyLeagueWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

export default function MyLeague() {
    return (
        <MyLeagueWrapper align="center">
            <ConnectLeague />
        </MyLeagueWrapper>
    )
}
