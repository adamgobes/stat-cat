import React from 'react'
import { Box, TextInput } from 'grommet'
import styled from 'styled-components'
import { FormSearch } from 'grommet-icons'

const AddPlayerInputWrapper = styled(Box)`
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

const AddPlayer = styled(TextInput)`
    width: 300px;
    margin: 0 24px;
    border-color: ${props => props.theme.global.colors.secondary};
`

const SearchIconWrapper = styled(Box)`
    margin-left: 12px;
`

const AddPlayerInput = ({ inputValue, onPlayerInputChange }) => (
    <Box direction="row" justify="center">
        <AddPlayerInputWrapper direction="row">
            <SearchIconWrapper justify="center">
                <FormSearch size="medium" />
            </SearchIconWrapper>
            <AddPlayer
                size="medium"
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
