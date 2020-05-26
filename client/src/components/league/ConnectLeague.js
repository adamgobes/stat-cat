import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, TextInput } from 'grommet'
import { useMutation } from '@apollo/react-hooks'

import espnLogo from '../../assets/images/espnlogo.png'
import { Title } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'
import { CREATE_LEAGUE_MUTATION } from '../../apollo/mutations'

const ConnectLeagueWrapper = styled(Box)`
    width: 90%;
    margin-top: 100px;
`

const Header = styled(Box)``

const ConnectTitle = styled(Title)`
    color: ${props => props.theme.global.colors.freeText};
`

const LogoWrapper = styled(Box)`
    width: 60px;
    height: 60px;
`

const FormInput = styled(TextInput)`
    width: 300px;
    margin: 10px 0;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
    border: none;
`

const ConnectButton = styled(RoundedButton)`
    min-width: 160px;
`

export default function ConnectLeague() {
    const [leagueId, setLeagueId] = useState('')

    const [connectLeague, { loading: connectLeagueLoading }] = useMutation(CREATE_LEAGUE_MUTATION, {
        variables: {
            leagueId,
        },
        refetchQueries: () => [],
    })

    return (
        <ConnectLeagueWrapper align="center">
            <Header direction="column" align="center">
                <LogoWrapper align="center" justify="center">
                    <img src={espnLogo} width="100%" height="100%" alt="PPG" />
                </LogoWrapper>
                <ConnectTitle>Connect your ESPN league and team</ConnectTitle>
            </Header>
            <Box align="center">
                <FormInput
                    name="name"
                    size="medium"
                    value={leagueId}
                    onChange={e => setLeagueId(e.target.value)}
                    placeholder="Enter ESPN League ID"
                />
                <ConnectButton
                    label="Connect Account"
                    loading={connectLeagueLoading}
                    onClick={() => connectLeague()}
                />
            </Box>
        </ConnectLeagueWrapper>
    )
}
