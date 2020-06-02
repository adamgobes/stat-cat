import React from 'react'
import { Checkmark, FormClose } from 'grommet-icons'
import styled from 'styled-components'
import { Box } from 'grommet'
import { Text } from '../shared/TextComponents'

const Wrapper = styled(Box)`
    position: fixed;
    z-index: 1;
    top: 0;
    left: ${({ isNavOpen }) => (isNavOpen ? '180px' : '0')};
    width: ${props => props.alertWidth}px;
    background: inherit;
`

const AlertWrapper = styled(Box)`
    position: relative;
    padding: 10px 64px 10px 32px;
    height: 32px;
    margin-top: 10px;
    background: ${props => (props.isError ? '#c95d6b' : '#80dfa8')};
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
    border-radius: 6px;
    visibility: ${props => (props.showAlert ? 'visible' : 'hidden')};
    opacity: ${props => (props.showAlert ? '1' : '0')};
    transition: opacity 600ms, visibility 600ms;
`

const AlertText = styled(Text)`
    color: white;
    font-size: 0.8em;
`

const CheckWrapper = styled(Box)`
    background: ${props => (props.isError ? '#ee8e9b' : '#9ce7be')};
    padding: 2px;
    border-radius: 100%;
    margin: 0px 20px;
`

const ExitWrapper = styled(Box)`
    position: absolute;
    right: 20px;
    cursor: pointer;
`

export default function Alert({ isNavOpen, alertWidth, alertInfo, onCloseAlert }) {
    return (
        <Wrapper align="center" isNavOpen={isNavOpen} alertWidth={alertWidth}>
            <AlertWrapper
                direction="row"
                align="center"
                showAlert={alertInfo.showAlert}
                isError={alertInfo.isError}
            >
                <Box direction="row" align="center">
                    <CheckWrapper isError={alertInfo.isError}>
                        {alertInfo.isError && <FormClose color="white" size="small" />}
                        {!alertInfo.isError && <Checkmark color="white" size="small" />}
                    </CheckWrapper>
                    <AlertText>{alertInfo.message}</AlertText>
                </Box>
                <ExitWrapper onClick={onCloseAlert}>
                    <FormClose size="medium" color="white" />
                </ExitWrapper>
            </AlertWrapper>
        </Wrapper>
    )
}
