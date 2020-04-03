import React, { useState, useRef, useEffect, forwardRef, useContext } from 'react'
import styled from 'styled-components'
import { Box, DropButton, Layer } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'

import { Text } from '../shared/TextComponents'
import AddTeamModal from '../shared/AddTeamModal'
import { AppContext, setSelectedTeam } from './AppContext'

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
    align-items: center;
    &:hover {
        background: #efefef;
    }
`

const Truncated = styled(Text)`
    font-size: 0.8em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const DropContent = forwardRef(({ teams, onTeamClick, onAddTeamClick }, ref) => (
    <Box ref={ref}>
        {teams.map(t => (
            <TeamDropdownItem direction="row" key={t.id} onClick={() => onTeamClick(t)}>
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
        <TeamDropdownItem direction="row" onClick={() => onAddTeamClick()}>
            <FirstLetterWrapper size="30" align="center" justify="center" background="#7781f7">
                <Text style={{ color: 'white', fontSize: '1em' }}>+</Text>
            </FirstLetterWrapper>
            <Box>
                <Truncated>Add Team</Truncated>
            </Box>
        </TeamDropdownItem>
    </Box>
))

export default function TeamSelector({ teams }) {
    const { dispatch } = useContext(AppContext)

    const [team, setTeam] = useState(teams[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showAddTeamModal, setShowAddTeamModal] = useState(false)

    function handleTeamClick(t) {
        setDropdownOpen(false)
        setTeam(t)
        dispatch(setSelectedTeam(t.id))
        // window.location.reload()
    }

    function handleAddTeamClick() {
        setShowAddTeamModal(true)
        setDropdownOpen(false)
    }

    const dropContentRef = useRef(null)
    const buttonRef = useRef(null)

    function handleClickOutside(event) {
        if (
            dropContentRef.current &&
            !dropContentRef.current.contains(event.target) &&
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
        <TeamSelectorWrapper align="center">
            <DropButton
                ref={buttonRef}
                onClick={() => {
                    setDropdownOpen(!dropdownOpen)
                }}
                dropContent={
                    <DropContent
                        ref={dropContentRef}
                        teams={teams}
                        setTeam={setTeam}
                        onTeamClick={handleTeamClick}
                        onAddTeamClick={handleAddTeamClick}
                    />
                }
                dropAlign={{ top: 'bottom', right: 'right' }}
                open={dropdownOpen}
            >
                <Box direction="row" align="center">
                    <FirstLetterWrapper
                        size="20"
                        background="white"
                        align="center"
                        justify="center"
                    >
                        <Text>{team.name.substring(0, 1)}</Text>
                    </FirstLetterWrapper>
                    <Box style={{ marginRight: '10px' }}>
                        <Truncated style={{ color: 'white', fontSize: '0.7em' }}>
                            {team.name}
                        </Truncated>
                    </Box>
                    <Box>
                        <Arrows direction="column">
                            <FormUp size="small" color="white" />
                            <FormDown size="small" color="white" />
                        </Arrows>
                    </Box>
                </Box>
            </DropButton>
            {showAddTeamModal && (
                <Layer
                    onEsc={() => setShowAddTeamModal(false)}
                    onClickOutside={() => setShowAddTeamModal(false)}
                >
                    <AddTeamModal />
                </Layer>
            )}
        </TeamSelectorWrapper>
    )
}
