import React from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled from 'styled-components'

const AddPlayer = styled(TextInput)`
    width: 300px;
    margin: 0 24px;
`

const AddPlayerInput = ({
    playerInput,
    handlePlayerInputChange,
	handleAddPlayer,
}) => (
    <Box align="center">
        <Box direction="row" width="medium">
            <AddPlayer
                size="medium"
                value={playerInput}
                onChange={handlePlayerInputChange}
            />
            <Button label="Add" onClick={() => handleAddPlayer(playerInput)} />
        </Box>
    </Box>
)

export default AddPlayerInput
