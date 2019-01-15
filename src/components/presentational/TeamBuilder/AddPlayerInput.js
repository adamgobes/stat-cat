import React from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled from 'styled-components'

const AddPlayer = styled(TextInput)`
    width: 300px;
	margin: 0 24px;
	border-color: #6FFFB0;
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
            />
        </Box>
    </Box>
)

export default AddPlayerInput
