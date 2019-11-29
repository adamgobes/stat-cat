import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import { Text } from '../general/TextComponents'

const TableHeaderText = styled(Text)`
    color: ${props => props.theme.global.colors.brand};
    font-size: 1em;
`

export const TableRow = styled(Box)`
    flex-direction: row;
    align-items: center;
    background: white;
    padding: 10px;
    margin: 4px 0;
    border-radius: 10px;
`

export default function DashboardTableHeader({ headers, sizes, justify = 'center' }) {
    return (
        <TableRow>
            {headers.map((header, i) => (
                <Box direction="row" justify={justify} basis={sizes[i]} key={i}>
                    <TableHeaderText>{header}</TableHeaderText>
                </Box>
            ))}
        </TableRow>
    )
}
