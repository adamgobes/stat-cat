import React, { useState, useRef, useEffect, forwardRef } from 'react'
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

const Truncated = styled(Text)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const DropContent = forwardRef(({ teams, onDropdownItemClick }, ref) => (
    <Box ref={ref}>
        {teams.map(t => (
            <TeamDropdownItem
                direction="row"
                align="center"
                key={t.id}
                onClick={() => onDropdownItemClick(t)}
            >
                <FirstLetterWrapper size="30" align="center" justify="center" background="#7781f7">
                    <Text style={{ color: 'white', fontSize: '0.7em' }}>
                        {t.name.substring(0, 1)}
                    </Text>
                </FirstLetterWrapper>
                <Box>
                    <Truncated>{t.name}</Truncated>
                </Box>
            </TeamDropdownItem>
        ))}
    </Box>
))

export default function TeamSelector({ teams }) {
    const [team, setTeam] = useState(teams[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    function handleDropdownItemClick(t) {
        setDropdownOpen(false)
        setTeam(t)
    }

    const dropDownRef = useRef(null)
    const buttonRef = useRef(null)

    function handleClickOutside(event) {
        if (
            dropDownRef.current &&
            !dropDownRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
        ) {
            setDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return (
        <DropButton
            ref={buttonRef}
            style={{ width: '25%' }}
            onClick={() => {
                setDropdownOpen(!dropdownOpen)
            }}
            dropContent={
                <DropContent
                    ref={dropDownRef}
                    teams={teams}
                    setTeam={setTeam}
                    onDropdownItemClick={handleDropdownItemClick}
                />
            }
            dropAlign={{ top: 'bottom', right: 'right' }}
            open={dropdownOpen}
        >
            <TeamSelectorWrapper direction="row" align="center">
                <FirstLetterWrapper size="20" background="white" align="center" justify="center">
                    <Text>{team.name.substring(0, 1)}</Text>
                </FirstLetterWrapper>
                <Box style={{ marginRight: '10px' }}>
                    <Truncated style={{ color: 'white', fontSize: '0.7em' }}>{team.name}</Truncated>
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
