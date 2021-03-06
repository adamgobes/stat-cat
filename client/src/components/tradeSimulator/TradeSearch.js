import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import AddPlayerInput from '../teamBuilder/playerSearch/AddPlayerInput'
import { getFirstLastShortened, getPlayerImage } from '../../apollo/dataSelectors'
import { Text } from '../shared/TextComponents'

const TRADE_SEARCH_WIDTH = 320

const AddRemoveButton = styled(Box)`
    border: 1px solid white;
    background: ${props => props.theme.global.colors.brand};
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
    sendablePlayers,
}) {
    const searchRef = useRef()
    const [suggestionOpen, setSuggestionOpen] = useState(false)

    const renderSuggestions = () =>
        searchValue.trim() && suggestions
            ? suggestions.slice(0, 3).map((player, index, list) => ({
                  label: (
                      <Box
                          data-testid="trade-search-result"
                          direction="row"
                          justify="evenly"
                          align="center"
                          border={index < list.length - 1 ? 'bottom' : undefined}
                          pad="small"
                          style={{ maxWidth: `${TRADE_SEARCH_WIDTH}px` }}
                      >
                          <PlayerImage src={getPlayerImage(player)} size="XS" />
                          <Truncated>
                              <strong>{getFirstLastShortened(player)}</strong>
                          </Truncated>
                          {sendablePlayers.includes(player.id) && (
                              <AddRemoveButton onClick={() => onSendPlayer(player)}>
                                  <Text>Send</Text>
                              </AddRemoveButton>
                          )}
                          {!sendablePlayers.includes(player.id) && (
                              <AddRemoveButton onClick={() => onReceivePlayer(player)}>
                                  <Text>Receive</Text>
                              </AddRemoveButton>
                          )}
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
                inputValue={searchValue}
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
