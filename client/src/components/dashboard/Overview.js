import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import { CircleQuestion } from 'grommet-icons'

import { Title, Subheader, Text } from '../shared/TextComponents'
import { RoundedButton } from '../shared/Buttons'

const OverviewWrapper = styled(Box)``

const TeamInfoWrapper = styled(Box)`
    background: ${props => props.theme.global.colors.brand};
    margin: 0 1%;
    padding: 20px;
    padding-left: 30px;
    opacity: 0.7;
    border-radius: 12px;
    width: 64%;
`

const OverviewTitle = styled(Title)`
    color: white;
    margin: 12px 0;
`

const LeagueName = styled(Subheader)`
    color: white;
    font-size: 1.1em;
    margin: 2px 0 26px 0;
`

const Record = styled(Box)`
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin: 6px 0px 0px 20px;
    height: 30px;
`

const SyncTeamWrapper = styled(Box)`
    background: white;
    margin: 0 1%;
    padding: 20px;
    padding-left: 30px;
    opacity: 0.7;
    border-radius: 12px;
    width: 28%;
`

const SyncTeamHeader = styled(Title)`
    color: black;
    font-size: 1.4em;
    margin: 0px;
`

const IconWrapper = styled.div`
    width: 20px;
    height: 20px;
    margin: 4px 0 0 10px;
    overflow: hidden;
    cursor: pointer;
`

export default function Overview() {
    return (
        <OverviewWrapper direction="row">
            <TeamInfoWrapper>
                <Box direction="row" align="center">
                    <OverviewTitle>TwoTime Reigning Champs</OverviewTitle>
                    <Record align="center" justify="center">
                        <Text style={{ fontWeight: 'bold' }}>12-6-2</Text>
                    </Record>
                </Box>
                <LeagueName>Schecker Bowl V3 (ESPN)</LeagueName>
            </TeamInfoWrapper>
            <SyncTeamWrapper>
                <Box direction="row" align="center">
                    <SyncTeamHeader>Sync Your Team</SyncTeamHeader>
                    <IconWrapper>
                        <CircleQuestion color="black" size="XS" />
                    </IconWrapper>
                </Box>
                <Text>Last synced on 2/2/2020, 1:23:32</Text>
                <Box style={{ width: '100%' }}>
                    <RoundedButton inverted width={160}>
                        Sync Team
                    </RoundedButton>
                </Box>
            </SyncTeamWrapper>
        </OverviewWrapper>
    )
}
