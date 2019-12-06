import React from 'react'
import styled from 'styled-components'
import { Heading, Text as GrommetText } from 'grommet'

const StyledTitle = styled(Heading)`
    font-family: Ubuntu;
`

export function Title({ children, className, style }) {
    return (
        <StyledTitle level="2" className={className} style={style}>
            {children}
        </StyledTitle>
    )
}

const StyledText = styled(GrommetText)`
    font-family: Roboto;
`

export function Text({ className, style, children }) {
    return (
        <StyledText className={className} style={style}>
            {children}
        </StyledText>
    )
}

const StyledSubheader = styled(Text)`
    font-family: Roboto;
    font-size: 1em;
    margin: 10px;
    color: ${props => props.theme.global.colors.brand};
    font-weight: bold;
`

export function Subheader({ children, className, style }) {
    return (
        <StyledSubheader className={className} style={style}>
            {children}
        </StyledSubheader>
    )
}

export function TextLogo({ color }) {
    return <Title style={{ fontSize: '2.6em', margin: '0', color }}>statcat</Title>
}
