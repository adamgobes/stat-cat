import React from 'react'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    Text,
} from 'grommet'

const COLUMNS = [
    {
        property: 'fullName',
        label: 'Name',
    },
    {
        property: 'currentTeam',
        label: 'Team',
    },
]

const TeamTable = ({ team }) => (
    <Box align="center" pad="large">
        <Table caption="Your Team">
            <TableHeader>
                <TableRow>
                    {COLUMNS.map(c => (
                        <TableCell key={c.property} scope="col">
                            <Text>{c.label}</Text>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {team.map(player => (
                    <TableRow key={player.id}>
                        {COLUMNS.map(c => (
                            <TableCell key={c.property}>
                                <Text>{player[c.property]}</Text>
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Box>
)

export default TeamTable
