import React from 'react'
import styled from 'styled-components'

const StyledSpan = styled.span`
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 45px;
    transition: 0.2s;
    background: ${props => props.theme.global.colors.brand};
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
`

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 50px;
    height: 25px;
    background: white;
    border-radius: 100px;
    position: relative;
    transition: background-color 0.2s;
    &:active + ${StyledSpan} {
        width: 60px;
    }
`

const StyledInput = styled.input`
    height: 0;
    width: 0;
    margin: 0;
    padding: 0;
    margin-left: -8px;
    visibility: hidden;
    &:checked + ${StyledLabel} ${StyledSpan} {
        left: calc(100% - 2px);
        transform: translateX(-100%);
    }
`

const Toggle = ({ isToggled, handleToggle }) => (
    <>
        <StyledInput checked={isToggled} onChange={handleToggle} id="switch" type="checkbox" />
        <StyledLabel htmlFor="switch">
            <StyledSpan />
        </StyledLabel>
    </>
)

export default Toggle
