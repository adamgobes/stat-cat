import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../../shared/PlayerImage'

const PlayerElement = styled(Box)`
    margin: 0 10px;
`

const ImageWrapper = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid;
    border-radius: 100%;
    border: 1px solid ${props => props.theme.global.colors.brand};
    overflow: hidden;
`

const InjuryReportWrapper = styled(Box)`
    width: 400px;
    height: 550px;
    box-shadow: rgba(0, 0, 0, 0.3) 0 1px 6px;
`

function InjuryReport({ injuriesData }) {
    return (
        <InjuryReportWrapper>
            <h1>Current Injuries</h1>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                {injuriesData.map(injury => (
                    <Box style={{ display: 'flex', flexDirection: 'row' }}>
                        <ImageWrapper align="center" justify="center" className="container">
                            <PlayerImage
                                src={injury.imageSrc}
                                name={injury.fullName}
                                imageHeight="80%"
                                imageWidth="100%"
                                noImageHeight="100%"
                                noImageWidth="85%"
                            />
                        </ImageWrapper>
                        <PlayerElement>
                            <p>{injury.fullName}</p>
                        </PlayerElement>
                    </Box>
                ))}
            </Box>
        </InjuryReportWrapper>
    )
}

// const InjuryReport = ({ injuriesData }) => {
//     const { players } = injuriesData
//     return (
//         <Box>
//             <Box justify="center" align="center">
//                 <WeekHeader>Week Of</WeekHeader>
//                 <DateHeader>Feb 26</DateHeader>
//             </Box>
//             <Box wrap gap="small">
//                 {players.map(player => (
//                     <PlayerContainer direction="row" align="center" key={player.id}>
//                         <ImageWrapper align="center" justify="center" className="container">
//                             <PlayerImage
//                                 src={player.imageSrc}
//                                 name={player.fullName}
//                                 imageHeight="100%"
//                                 imageWidth="100%"
//                                 noImageHeight="100%"
//                                 noImageWidth="85%"
//                             />
//                         </ImageWrapper>
//                         <PlayerElement>
//                             <p>{player.fullName}</p>
//                         </PlayerElement>
//                         <PlayerElement>
//                             <h2>{player.gameCountThisWeek}</h2>
//                         </PlayerElement>
//                     </PlayerContainer>
//                 ))}
//             </Box>
//         </Box>
//     )
// }

export default InjuryReport
