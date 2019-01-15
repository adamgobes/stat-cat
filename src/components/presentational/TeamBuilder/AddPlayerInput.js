import React from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled, { withTheme } from 'styled-components'

const AddPlayer = styled(TextInput)`
    width: 300px;
	margin: 0 24px;
	border-color: ${props => props.theme.global.colors.secondary};
`

const AddPlayerInput = ({
    playerInput,
    handlePlayerInputChange,
}) => (
    <Box justify="center" direction="row">
        <Box>
            <AddPlayer
                size="medium"
                value={playerInput}
				onChange={handlePlayerInputChange}
				placeholder="Search for Players"
				focusIndicator={false}
            />
        </Box>
    </Box>
)

export default withTheme(AddPlayerInput)
