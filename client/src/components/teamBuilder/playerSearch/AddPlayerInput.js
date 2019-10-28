import React from 'react'
import { Box, TextInput } from 'grommet'
import styled from 'styled-components'
import { FormSearch } from 'grommet-icons'

const AddPlayerInputWrapper = styled(Box)`
    width: ${props => props.width}px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const AddPlayer = styled(TextInput)`
    width: ${props => props.width}px;
    margin: 0 24px;
    border-color: ${props => props.theme.global.colors.secondary};
`

const SearchIconWrapper = styled(Box)`
    margin-left: 12px;
`

const AddPlayerInput = ({ inputValue, onPlayerInputChange, width = 300, ...otherProps }) => (
    <Box direction="row" justify="center">
        <AddPlayerInputWrapper direction="row" width={width}>
            <SearchIconWrapper justify="center">
                <FormSearch size="medium" />
            </SearchIconWrapper>
            <AddPlayer
                {...otherProps}
                size="medium"
                width={width}
                value={inputValue}
                onChange={onPlayerInputChange}
                placeholder="Search for Players"
                focusIndicator={false}
                plain
            />
        </AddPlayerInputWrapper>
    </Box>
)

export default AddPlayerInput
