import React, { useState, useEffect } from 'react'
import { Box, Grid } from 'grommet'
import styled from 'styled-components'

import allPlayersRequest from '../../utils/sportsFeedAPI'
import AddPlayerInput from '../presentational/TeamBuilder/AddPlayerInput'
import TeamTable from '../presentational/TeamBuilder/TeamTable'
import SuggestionsGrid from '../presentational/TeamBuilder/PlayersGrid'
import Logo from '../presentational/Logo'
import Nav from '../presentational/Nav'

const Header = styled.h1`
    text-align: center;
    margin: 60px 0;
`

const TeamBuilder = () => {
    const [playerInput, setPlayerInput] = useState('')
    const [allPlayers, setAllPlayers] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [team, setTeam] = useState([])

    useEffect(() => {
        allPlayersRequest().then(res => setAllPlayers(
                res.data.players.map(p => ({
                    firstName: p.player.firstName,
                    lastName: p.player.lastName,
                    fullName: `${p.player.firstName} ${p.player.lastName}`,
                    currentTeam: p.player.currentTeam ? p.player.currentTeam.abbreviation : 'None',
                    imageSrc: p.player.officialImageSrc,
                    id: p.player.id,
                })),
            ))
    })
    const onPlayerInputChange = (e) => {
        const val = e.target.value

        setPlayerInput(val)

        if (val === '') setSuggestions([])
        else {
            setSuggestions(
                allPlayers.filter(
                    player => player.fullName.toLowerCase().startsWith(val.toLowerCase())
                        || player.firstName.toLowerCase().startsWith(val.toLowerCase())
                        || player.lastName.toLowerCase().startsWith(val.toLowerCase()),
                ),
            )
        }
    }

    const onAddPlayer = (player) => {
        setTeam([...team, player])
    }

    const onRemovePlayer = (player) => {
        setTeam(team.filter(p => player.id !== p.id))
    }

    return (
        <Box>
            <Nav />
            <Grid
                fill
                areas={[
                    { name: 'search', start: [0, 0], end: [0, 0] },
                    { name: 'team', start: [1, 0], end: [1, 0] },
                ]}
                columns={['1/3', 'flex']}
                rows={['flex']}
                gap="small"
            >
                <Box gridArea="search">
                    <Header>Team Builder</Header>
                    <AddPlayerInput
                        playerInput={playerInput}
                        handleAddPlayer={onAddPlayer}
                        handlePlayerInputChange={onPlayerInputChange}
                    />
                    <SuggestionsGrid suggestions={suggestions} onAddPlayer={onAddPlayer} />
                </Box>
                <Box gridArea="team">
                    {team.length !== 0 && (
                        <TeamTable team={team} handleRemovePlayer={onRemovePlayer} />
                    )}
                    {team.length === 0 && (
                        <Box align="center" pad="large" justify="center" className="container">
                            <Logo />
                            <h2>Add players using the form to the left!</h2>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Box>
    )
}

export default TeamBuilder
