import React, { useRef } from 'react'
import styled from 'styled-components'
import { Box, Text, Button } from 'grommet'
import PlayerImage from '../shared/PlayerImage'
import AddPlayerInput from '../teamBuilder/playerSearch/AddPlayerInput'

const AddRemoveButton = styled(Box)`
    border: 1px solid white;
    background: #7781f7;
    border-radius: 5px;
    color: white;
    padding: 4px;
`

export default function TradeSearch({
    searchValue,
    suggestions,
    handleInputChange,
    loading,
    onSendPlayer,
    onReceivePlayer,
}) {
    const searchRef = useRef()

    const renderSuggestions = () =>
        searchValue.trim() && suggestions
            ? suggestions.slice(0, 3).map((player, index, list) => ({
                  label: (
                      <Box
                          direction="row"
                          align="center"
                          gap="small"
                          border={index < list.length - 1 ? 'bottom' : undefined}
                          pad="small"
                      >
                          <PlayerImage src={player.imageSrc} size="XS" />
                          <Text>
                              <strong>
                                  {`${player.firstName.substring(0, 1)}. ${player.lastName}`}
                              </strong>
                          </Text>
                          <AddRemoveButton onClick={() => onSendPlayer(player)}>
                              Send
                          </AddRemoveButton>
                          <AddRemoveButton onClick={() => onReceivePlayer(player)}>
                              Receive
                          </AddRemoveButton>
                      </Box>
                  ),
                  value: player.id,
              }))
            : []

    return (
        <Box
            ref={searchRef}
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
                loading={loading}
            />
        </Box>
    )
}
