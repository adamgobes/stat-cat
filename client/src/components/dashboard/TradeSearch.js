import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Box, Text, Button } from 'grommet'
import PlayerImage from '../shared/PlayerImage'
import AddPlayerInput from '../teamBuilder/playerSearch/AddPlayerInput'

const TRADE_SEARCH_WIDTH = 320

const AddRemoveButton = styled(Box)`
    border: 1px solid white;
    background: #7781f7;
    border-radius: 5px;
    color: white;
    padding: 4px;
`

const Truncated = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 6px;
    max-width: 38%;
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
    const [suggestionOpen, setSuggestionOpen] = useState(false)

    const renderSuggestions = () =>
        searchValue.trim() && suggestions
            ? suggestions.slice(0, 3).map((player, index, list) => ({
                  label: (
                      <Box
                          direction="row"
                          justify="evenly"
                          align="center"
                          border={index < list.length - 1 ? 'bottom' : undefined}
                          pad="small"
                          style={{ maxWidth: `${TRADE_SEARCH_WIDTH}px` }}
                      >
                          <PlayerImage src={player.imageSrc} size="XS" />
                          <Truncated>
                              <strong>
                                  {`${player.firstName.substring(0, 1)}. ${player.lastName}`}
                              </strong>
                          </Truncated>
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
        <Box ref={searchRef} direction="column" align="center" round="small">
            <AddPlayerInput
                onPlayerInputChange={handleInputChange}
                width={TRADE_SEARCH_WIDTH}
                value={searchValue}
                suggestions={renderSuggestions()}
                dropTarget={searchRef.current}
                loading={loading}
                suggestionsOpen={suggestionOpen}
                onSuggestionsOpen={() => setSuggestionOpen(true)}
                onSuggestionsClose={() => setSuggestionOpen(false)}
            />
        </Box>
    )
}
