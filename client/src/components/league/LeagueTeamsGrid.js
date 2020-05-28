import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Subheader, Title } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'
import { WEEKLY_OVERVIEW_QUERY, MY_STATS_QUERY, ALL_MY_TEAMS_QUERY } from '../../apollo/queries'
import { SYNC_ESPN_TEAM } from '../../apollo/mutations'
import { AppContext } from '../general/AppContext'

const Wrapper = styled(Box)`
    width: 86%;
`

const SelectTeamHeader = styled(Subheader)`
    color: ${props => props.theme.global.colors.freeText};
    text-align: left;
    font-size: 1.1em;
`

const GridRow = styled(Box)``

const Cell = styled(Box)`
    background: ${props => (props.selected ? props.theme.global.colors.brand : 'white')};
    color: red;
    flex-basis: 21%;
    margin: 10px 2%;
    height: 100px;
    text-align: center;
    cursor: pointer;
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
    }
`

const TeamNameText = styled(Subheader)`
    font-size: 0.8em;
    color: ${props => (props.selected ? props.theme.global.colors.contrast : 'black')};
`

const ConnectButton = styled(RoundedButton)`
    width: 160px;
`

export default function LeagueTeamsGrid({ leagueId, teams }) {
    const {
        appContext: { selectedTeam },
    } = useContext(AppContext)

    const history = useHistory()

    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [syncSuccessful, setSyncSuccessful] = useState(false)

    const [syncTeam, { loading: syncTeamLoading }] = useMutation(SYNC_ESPN_TEAM, {
        variables: {
            leagueId,
            statCatTeamId: selectedTeam,
            espnTeamId: selectedIndex.toString(),
        },
        refetchQueries: () => [
            { query: WEEKLY_OVERVIEW_QUERY, variables: { teamId: selectedTeam } },
            { query: MY_STATS_QUERY, variables: { timeFrame: 'All', teamId: selectedTeam } },
            { query: ALL_MY_TEAMS_QUERY },
        ],
        awaitRefetchQueries: true,
        onCompleted: data => {
            setSyncSuccessful(true)
            history.push('/app/teambuilder')
        },
    })
    return (
        <Wrapper>
            <SelectTeamHeader>Select your team</SelectTeamHeader>
            <GridRow direction="row" justify="start" wrap>
                {teams.map(team => (
                    <Cell
                        key={team.teamId}
                        align="center"
                        justify="center"
                        onClick={() => setSelectedIndex(team.teamId)}
                        selected={team.teamId === selectedIndex}
                    >
                        <TeamNameText selected={team.teamId === selectedIndex}>
                            {team.teamName}
                        </TeamNameText>
                    </Cell>
                ))}
            </GridRow>
            <Box style={{ width: '100%' }} align="center">
                <ConnectButton
                    label="Connect Team"
                    loading={syncTeamLoading}
                    disabled={selectedIndex === -1}
                    onClick={() => syncTeam()}
                />
            </Box>
        </Wrapper>
    )
}
