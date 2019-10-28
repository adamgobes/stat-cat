import React, { useRef } from 'react'
import styled from 'styled-components'
import { Box, Text } from 'grommet'
import PlayerImage from '../shared/PlayerImage'
import AddPlayerInput from '../teamBuilder/playerSearch/AddPlayerInput'
import Loader from '../shared/Loader'

export default function TradeSearch({ searchValue, suggestions, handleInputChange, loading }) {
    const searchRef = useRef()

    const renderSuggestions = () =>
        searchValue.trim() && suggestions
            ? suggestions.slice(0, 3).map(({ fullName, imageSrc }, index, list) => ({
                  label: (
                      <Box
                          direction="row"
                          align="center"
                          gap="small"
                          border={index < list.length - 1 ? 'bottom' : undefined}
                          pad="small"
                      >
                          <PlayerImage src={imageSrc} size="XS" />
                          <Text>
                              <strong>{fullName}</strong>
                          </Text>
                      </Box>
                  ),
                  value: fullName,
              }))
            : []

    return (
        <Box
            ref={searchRef}
            width="250"
            direction="column"
            align="center"
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            round="small"
        >
            <AddPlayerInput
                onPlayerInputChange={handleInputChange}
                width={250}
                value={searchValue}
                suggestions={renderSuggestions()}
                dropTarget={searchRef.current}
            />
            {loading && <Loader size={50} />}
        </Box>
    )
}
