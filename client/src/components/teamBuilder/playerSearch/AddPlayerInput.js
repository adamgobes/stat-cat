import React from 'react'
import { Box, TextInput } from 'grommet'
import styled from 'styled-components'
import { FormSearch } from 'grommet-icons'
import Loader from '../../shared/Loader'

const AddPlayerInputWrapper = styled(Box)`
    width: ${props => props.inputWidth}px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
    ${props => (props.suggestionsOpen ? 'border-bottom-left-radius: 0px' : '')}
    ${props => (props.suggestionsOpen ? 'border-bottom-right-radius: 0px' : '')}
`

const AddPlayer = styled(TextInput)`
    width: ${props => props.width}px;
    margin: 0 24px;
    border-color: ${props => props.theme.global.colors.secondary};
`

const SearchIconWrapper = styled(Box)`
    margin-left: 12px;
`

const SearchLoaderWrapper = styled.div`
    position: relative;
    left: 12px;
`

const AddPlayerInput = ({
    inputValue,
    onPlayerInputChange,
    width = 300,
    loading = false,
    ...otherProps
}) => (
    <Box direction="row" justify="center">
        <AddPlayerInputWrapper
            direction="row"
            inputWidth={width}
            suggestionsOpen={otherProps.suggestionsOpen}
        >
            {!loading && (
                <SearchIconWrapper justify="center">
                    <FormSearch size="medium" />
                </SearchIconWrapper>
            )}
            {loading && (
                <SearchLoaderWrapper>
                    <Loader size="20" />
                </SearchLoaderWrapper>
            )}
            <AddPlayer
                {...otherProps}
                size="medium"
                width={width}
                value={inputValue}
                onChange={onPlayerInputChange}
                placeholder="Search for Players"
                focusIndicator={false}
                plain
            />
        </AddPlayerInputWrapper>
    </Box>
)

export default AddPlayerInput
