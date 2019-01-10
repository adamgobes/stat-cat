import React from 'react';
import { Box, Button, TextInput } from 'grommet';
import styled from 'styled-components';

const AddPlayerInput = styled(TextInput)`
    width: 600px;
`;

const TeamBuilder = () => (
    <div>
        <h1>Let's Build Your Team</h1>
        <Box align="center">
            <Box direction="row" width="medium">
                <TextInput size="large" />
                <Button label="Add" />
            </Box>
        </Box>
    </div>
);

export default TeamBuilder;
