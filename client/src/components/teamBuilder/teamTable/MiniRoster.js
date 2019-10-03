import React, { useState } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { FormUp } from 'grommet-icons'

import Roster from './Roster'
import PlayerImage from '../../shared/PlayerImage'

const MiniRosterWrapper = styled(Box)`
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: #7781f7;
    padding: 20px 0;
    border-radius: 10px;
`

const ExpandButton = styled(Box)`
    position: absolute;
    top: -20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 2px solid #7781f7;
    background: white;
    transition: 0.3s;
    cursor: pointer;
`

function MiniRoster({ players }) {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <MiniRosterWrapper direction="row" justify="center">
            <ExpandButton
                direction="column"
                justify="center"
                align="center"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <FormUp size="medium" color="#7781f7" />
            </ExpandButton>
            {!isExpanded &&
                players.map(p => (
                    <Box style={{ margin: '0 20px' }}>
                        <PlayerImage size="S" src={p.imageSrc} borderColor="white" />
                    </Box>
                ))}
            {isExpanded && <Roster players={players} />}
        </MiniRosterWrapper>
    )
}

export default MiniRoster
