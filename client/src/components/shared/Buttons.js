import React from 'react'
import styled from 'styled-components'
import { Button } from 'grommet'

import Loader from './Loader'

const StyledRoundedButton = styled(Button)`
    width: ${props => props.width}px;
    border-radius: 20px;
    background: ${props => (props.inverted ? props.theme.global.colors.brand : 'white')};
    color: ${props => (props.inverted ? 'white' : props.theme.global.colors.brand)};
    padding: 10px;
    text-align: center;
    margin-top: 12px;
    font-family: Roboto;
`

export function RoundedButton({
    className,
    style,
    loading,
    label,
    inverted = false,
    width,
    ...otherProps
}) {
    return (
        <StyledRoundedButton
            inverted={inverted}
            style={style}
            width={width}
            className={className}
            label={loading ? <Loader size={20} /> : label}
            {...otherProps}
        />
    )
}

export function SquareButton({ className, style, inverted = false, width, label }) {
    return !inverted && <StyledRoundedButton label={label} width={width} className={className} />
}
