import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import TradeSearch from './TradeSearch'

const TradeSimulatorWrapper = styled(Box)`
    position: relative;
    width: 600px;
    min-height: 450px;
    background: white;
    border-radius: 10px;
`

const SentReceived = styled(Box)``
const SearchWrapper = styled(Box)``

const ImageWrapper = styled(Box)`
    margin: 10px;
`

export default function TradeSimulator({ searchResults }) {
    const [addInputValue, setAddInputValue] = useState('')

    return (
        <TradeSimulatorWrapper>
            <h1 style={{ margin: '20px' }}>Trade Simulator</h1>
            <Box direction="row" align="start" justify="center">
                <SearchWrapper direction="column" justify="center" align="center" basis="2/4">
                    <TradeSearch
                        searchValue={addInputValue}
                        suggestions={searchResults}
                        handleInputChange={e => setAddInputValue(e.target.value)}
                    />
                </SearchWrapper>
                <Box direction="column" align="center" basis="2/4">
                    <SentReceived direction="column" justify="center" basis="1/2">
                        <Box>
                            <h3>You Send</h3>
                        </Box>
                        <ImageWrapper>
                            <PlayerImage
                                src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
                                size="XS"
                            />
                        </ImageWrapper>
                        <ImageWrapper>
                            <PlayerImage
                                src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
                                size="XS"
                            />
                        </ImageWrapper>
                    </SentReceived>
                    <SentReceived direction="column" justify="center" basis="1/2">
                        <h3>You Receive</h3>
                        <ImageWrapper>
                            <PlayerImage
                                src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
                                size="XS"
                            />
                        </ImageWrapper>
                        <ImageWrapper>
                            <PlayerImage
                                src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
                                size="XS"
                            />
                        </ImageWrapper>
                    </SentReceived>
                </Box>
            </Box>
        </TradeSimulatorWrapper>
    )
}
