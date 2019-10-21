import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { Previous, Next } from 'grommet-icons'

const PaginationComponent = styled(Box)`
    position: absolute;
    bottom: 8px;
    right: 20px;
    width: 100px;
    border-radius: 10px;
    background: white;
`

export const PaginationButton = styled(Box)`
    width: 50%;
    height: 100%;
    border-radius: 10px;
    padding: 4px 0;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
        transition: 0.2s;
    }
`

export default function Pagination({ increment, decrement }) {
    return (
        <PaginationComponent direction="row" justify="evenly">
            <PaginationButton align="center" onClick={decrement}>
                <Previous size="small" />
            </PaginationButton>
            <PaginationButton align="center" onClick={increment}>
                <Next size="small" />
            </PaginationButton>
        </PaginationComponent>
    )
}
