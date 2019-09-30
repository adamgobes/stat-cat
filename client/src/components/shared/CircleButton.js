import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

const CircleButtonWrapper = styled(Box)`
    cursor: pointer;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    background: ${props => props.theme.global.colors.brand};
    font-weight: bold;
    color: white;
    font-size: 1.8em;
    &:hover {
        background: white;
        color: ${props => props.theme.global.colors.brand};
        transition: 0.2s ease;
        border: 2px solid ${props => props.theme.global.colors.brand};
    }
`

const CircleButton = ({ children, handleClick }) => (
    <CircleButtonWrapper direction="column" align="center" justify="center" onClick={handleClick}>
        <div style={{ margin: '0 0 2px 1px' }}>{children}</div>
    </CircleButtonWrapper>
)

export default CircleButton
