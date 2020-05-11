import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import Contacts from './Contacts'

const MessagingWrapper = styled(Box)`
    position: relative;
    background: ${props => props.theme.global.colors.backdrop};
    height: 100%;
    overflow: scroll;
`

export default function Messaging() {
    return (
        <MessagingWrapper>
            <Contacts />
        </MessagingWrapper>
    )
}
