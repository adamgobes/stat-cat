import React, { useState, useRef, useEffect, forwardRef, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
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

const LeagueName = styled(Truncated)`
    font-size: 0.6em;
    color: gray;
`

const DropContent = forwardRef(({ otherTeams, onTeamClick, onAddTeamClick }, ref) => {
    const theme = useContext(ThemeContext)
    return (
        <Box ref={ref}>
            {otherTeams.map(t => (
                <TeamDropdownItem direction="row" key={t.id} onClick={() => onTeamClick(t)}>
                    <FirstLetterWrapper
                        size="30"
                        align="center"
                        justify="center"
                        background={theme.global.colors.brand}
                    >
                        <Text style={{ color: 'white', fontSize: '0.7em' }}>
                            {t.name.substring(0, 1)}
                        </Text>
                    </FirstLetterWrapper>
                    <Box justify="center">
                        <Box justify="center">
                            <Truncated style={{ marginTop: '6px' }}>{t.name}</Truncated>
                            {t.league && (
                                <LeagueName style={{ marginTop: '-6px' }}>
                                    {t.league.name}
                                </LeagueName>
                            )}
                        </Box>
                    </Box>
                </TeamDropdownItem>
            ))}
            <TeamDropdownItem direction="row" onClick={() => onAddTeamClick()}>
                <FirstLetterWrapper
                    size="30"
                    align="center"
                    justify="center"
                    background={theme.global.colors.brand}
                >
                    <Text style={{ color: 'white', fontSize: '1em' }}>+</Text>
                </FirstLetterWrapper>
                <Box>
                    <Truncated>Add Team</Truncated>
                </Box>
            </TeamDropdownItem>
        </Box>
    )
})

export default function TeamSelector({ teams }) {
    const { appContext, dispatch } = useContext(AppContext)

    const [currentTeam, setCurrentTeam] = useState(teams[0])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [showAddTeamModal, setShowAddTeamModal] = useState(false)

    useEffect(() => {
        setCurrentTeam(teams.find(t => t.id === appContext.selectedTeam))
    }, [teams, setCurrentTeam])

    function handleTeamClick(t) {
        setDropdownOpen(false)
        setCurrentTeam(t)
        dispatch(setSelectedTeam(t.id))
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
                        otherTeams={teams.filter(t => t.id !== currentTeam.id)}
                        setTeam={setCurrentTeam}
                        onTeamClick={handleTeamClick}
                        onAddTeamClick={handleAddTeamClick}
                    />
                }
                dropAlign={{ top: 'bottom', right: 'right' }}
                open={dropdownOpen}
                style={{ maxWidth: '100%' }}
            >
                <Box direction="row" align="center">
                    <FirstLetterWrapper
                        size="20"
                        background="white"
                        align="center"
                        justify="center"
                    >
                        <Text>{currentTeam.name.substring(0, 1)}</Text>
                    </FirstLetterWrapper>
                    <Box style={{ marginRight: '10px' }}>
                        <Truncated style={{ color: 'white', fontSize: '0.7em' }}>
                            {currentTeam.name}
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
                    <AddTeamModal
                        closeModal={() => setShowAddTeamModal(false)}
                        setTeam={setCurrentTeam}
                    />
                </Layer>
            )}
        </TeamSelectorWrapper>
    )
}
