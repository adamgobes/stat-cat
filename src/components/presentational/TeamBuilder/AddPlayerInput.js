import React from 'react'
import { Box, Button, TextInput } from 'grommet'
import styled from 'styled-components'

const AddPlayer = styled(TextInput)`
    width: 300px;
    margin: 0 24px;
`

const AddPlayerInput = ({
    autocomplete,
    playerInput,
    handlePlayerInputChange,
	handlePlayerSelect,
	handleAddPlayer,
}) => (
    <Box align="center">
        <Box direction="row" width="medium">
            <AddPlayer
                size="large"
                value={playerInput}
                onChange={handlePlayerInputChange}
                suggestions={autocomplete}
                onSelect={handlePlayerSelect}
            />
            <Button label="Add" onClick={() => handleAddPlayer(playerInput)} />
        </Box>
    </Box>
)

export default AddPlayerInput
