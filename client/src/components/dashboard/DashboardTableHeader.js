import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

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
        <TableRow
            style={{ margin: '12px 0', background: '#7781f7', color: 'white', fontWeight: 'bold' }}
        >
            {headers.map((header, i) => (
                <Box direction="row" justify={justify} basis={sizes[i]} key={i}>
                    <Box>{header}</Box>
                </Box>
            ))}
        </TableRow>
    )
}
