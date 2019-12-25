import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, DropButton } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'

import { Text, Subheader } from '../shared/TextComponents'

const TeamSelectorWrapper = styled(Box)``

const FirstLetterWrapper = styled(Box)`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 3px;
    background: ${props => props.background};
    margin-right: 10px;
`

const Arrows = styled(Box)`
    cursor: pointer;
`

const TeamDropdownItem = styled(Box)`
    padding: 10px;
    width: 100%;
    cursor: pointer;
    transition: background 120ms ease-in 0s;
    &:hover {
        background: #efefef;
    }
`

function DropContent({ teams, onDropdownItemClick }) {
    return teams.map(t => (
        <TeamDropdownItem
            direction="row"
            align="center"
            key={t.id}
            onClick={() => onDropdownItemClick(t)}
        >
            <FirstLetterWrapper size="40" align="center" justify="center" background="#7781f7">
                <Text style={{ color: 'white', fontSize: '1em' }}>{t.name.substring(0, 1)}</Text>
            </FirstLetterWrapper>
            <Box>
                <Text>{t.name}</Text>
            </Box>
        </TeamDropdownItem>
    ))
}

export default function TeamSelector({ teams }) {
    const [team, setTeam] = useState(teams[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    function handleDropdownItemClick(t) {
        setDropdownOpen(false)
        setTeam(t)
    }

    return (
        <DropButton
            style={{ width: '25%' }}
            onClick={() => setDropdownOpen(true)}
            dropContent={
                <DropContent
                    teams={teams}
                    setTeam={setTeam}
                    onDropdownItemClick={handleDropdownItemClick}
                />
            }
            dropAlign={{ top: 'bottom', right: 'right' }}
            open={dropdownOpen}
        >
            <TeamSelectorWrapper direction="row" align="center">
                <FirstLetterWrapper size="30" background="white" align="center" justify="center">
                    <Text>{team.name.substring(0, 1)}</Text>
                </FirstLetterWrapper>
                <Box>
                    <Subheader style={{ color: 'white' }}>{team.name}</Subheader>
                </Box>
                <Box>
                    <Arrows direction="column">
                        <FormUp size="small" color="white" />
                        <FormDown size="small" color="white" />
                    </Arrows>
                </Box>
            </TeamSelectorWrapper>
        </DropButton>
    )
}
