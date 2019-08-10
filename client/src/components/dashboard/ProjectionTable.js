import React from 'react'
import { Box, DataTable, Text } from 'grommet'

import { computeProjections } from '../../utils/computeHelpers'

const ProjectionTable = ({ projectionsData }) => {
    const { players } = projectionsData
    const projections = computeProjections(players)
    return (
        <Box justify="center" align="center">
            <DataTable
                columns={[
                    {
                        property: 'stat',
                        header: <Text>Category</Text>,
                        primary: true,
                    },
                    {
                        property: 'value',
                        header: <Text>Projection</Text>,
                        render: data => <Text>{data.value}</Text>,
                    },
                ]}
                data={projections.map(p => ({
                    stat: p.category,
                    value: p.value,
                }))}
            />
        </Box>
    )
}

export default ProjectionTable
