import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'
import AddPlayerInput from '../teamBuilder/playerSearch/AddPlayerInput'

const TradeSimulatorWrapper = styled(Box)`
    position: relative;
    width: 600px;
    min-height: 300px;
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
                <SentReceived direction="row" justify="evenly" basis="1/4" wrap>
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
                <SearchWrapper direction="column" justify="center" align="center" basis="2/4">
                    <AddPlayerInput
                        onPlayerInputChange={e => setAddInputValue(e.target.value)}
                        width={250}
                        inputValue={addInputValue}
                    />
                    <ImageWrapper>
                        <PlayerImage
                            src="https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201142.png"
                            size="XS"
                        />
                    </ImageWrapper>
                </SearchWrapper>
                <SentReceived direction="row" justify="evenly" basis="1/4" wrap>
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
        </TradeSimulatorWrapper>
    )
}
