import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'
import ReactTooltip from 'react-tooltip'

import PlayerImage from '../../shared/PlayerImage'

const InjuryText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 70px;
    margin: 0 14px;
    width: 90px;
`

const Truncated = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const InjuryReportWrapper = styled(Box)`
    width: 620px;
    height: 400px;
    overflow: scroll;
    padding: 0px 20px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

function InjuryReport({ injuriesData }) {
    return (
        <InjuryReportWrapper>
            <ReactTooltip />
            <h1>Current Injuries</h1>
            <Box>
                {injuriesData.map(injury => (
                    <Box direction="row" justify="between" style={{ margin: '10px 0' }}>
                        <Box direction="row" justify="start">
                            <PlayerImage src={injury.imageSrc} name={injury.fullName} size="S" />
                            <InjuryText>
                                <Truncated>{injury.fullName}</Truncated>
                            </InjuryText>
                        </Box>
                        <InjuryText>
                            <Truncated data-tip={injury.description}>
                                {injury.description}
                            </Truncated>
                        </InjuryText>
                        <InjuryText>
                            <Truncated>{injury.playingProbability}</Truncated>
                        </InjuryText>
                    </Box>
                ))}
            </Box>
        </InjuryReportWrapper>
    )
}

export default InjuryReport
