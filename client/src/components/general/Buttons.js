import React from 'react'
import styled from 'styled-components'
import { Button } from 'grommet'

const StyledSquareButton = styled(Button)`
    width: ${props => props.width}px;
    border-radius: 20px;
    background: white;
    color: ${props => props.theme.global.colors.brand};
    padding: 10px;
    text-align: center;
    margin-top: 12px;
    font-family: Roboto;
`

const StyledSquareButtonInverted = styled(Button)`
    border-radius: 20px;
    background: ${props => props.theme.global.colors.brand};
    color: white;
    padding: 10px;
    text-align: center;
    margin-top: 12px;
    font-family: Roboto;
`

const StyledRoundedButton = styled(Button)`
    border-radius: 100%;
    background: white;
    color: ${props => props.theme.global.colors.brand};
    padding: 10px;
    text-align: center;
    margin-top: 12px;
    font-family: Roboto;
`

export function RoundedButton({ className, style, inverted = false, width, ...otherProps }) {
    if (!inverted) {
        return (
            !inverted && (
                <StyledSquareButton
                    style={style}
                    width={width}
                    className={className}
                    {...otherProps}
                />
            )
        )
    }

    return (
        <StyledSquareButtonInverted
            style={style}
            width={width}
            className={className}
            {...otherProps}
        />
    )
}

export function SquareButton({ className, style, inverted = false, width, label }) {
    return !inverted && <StyledSquareButton label={label} width={width} className={className} />
}
