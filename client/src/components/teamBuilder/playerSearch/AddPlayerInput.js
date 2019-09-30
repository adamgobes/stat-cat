import React from 'react'
import { Box, TextInput } from 'grommet'
import styled from 'styled-components'

const AddPlayer = styled(TextInput)`
    width: 300px;
    margin: 0 24px;
    border-color: ${props => props.theme.global.colors.secondary};
`

const AddPlayerInput = ({ inputValue, onPlayerInputChange }) => (
    <Box direction="row" justify="center">
        <Box>
            <AddPlayer
                size="medium"
                value={inputValue}
                onChange={onPlayerInputChange}
                placeholder="Search for Players"
                focusIndicator={false}
            />
        </Box>
    </Box>
)

export default AddPlayerInput
