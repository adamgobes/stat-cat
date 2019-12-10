import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { Previous, Next } from 'grommet-icons'

import { Text } from '../shared/TextComponents'

const PaginationComponent = styled(Box)`
    position: absolute;
    bottom: 8px;
    right: 20px;
    width: 30%;
    border-radius: 10px;
    background: white;
    @media (max-width: 950px) {
        width: 40%;
    }
`

export const PaginationButton = styled(Box)`
    width: 35%;
    height: 100%;
    border-radius: 10px;
    padding: 4px 0;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
        transition: 0.2s;
    }
`

const PageIndicator = styled(Box)`
    width: 30%;
`

export default function Pagination({ increment, decrement, page, totalPages }) {
    return (
        <PaginationComponent direction="row" justify="evenly">
            <PageIndicator>
                <Text style={{ fontSize: '0.8em' }}>{`${page} of ${totalPages}`}</Text>
            </PageIndicator>
            <PaginationButton align="center" onClick={decrement}>
                <Previous size="small" />
            </PaginationButton>
            <PaginationButton align="center" onClick={increment}>
                <Next size="small" />
            </PaginationButton>
        </PaginationComponent>
    )
}
