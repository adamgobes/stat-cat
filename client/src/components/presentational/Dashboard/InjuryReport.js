import React from 'react'
import styled from 'styled-components'
import { Box } from 'grommet'

import PlayerImage from '../shared/PlayerImage'

const ImageWrapper = styled(Box)`
	width: 80px;
	height: 60px;
`

const WeekHeader = styled.h1`
	color: white;
	opacity: 0.6;
	margin-top: 60px;
`

const DateHeader = styled.h1`
	color: white;
	margin-top: 0px;
`

const PlayerContainer = styled(Box)`
	padding: 12px;
	margin: 10px 0;
	width: 80%;
	background-color: white;
`

const PlayerElement = styled(Box)`
	margin: 0 10px;
`

const InjuryReport = ({ injuriesData }) => {
	const { players } = injuriesData
	return (
		<Box>
			<Box justify="center" align="center">
				<WeekHeader>Week Of</WeekHeader>
				<DateHeader>Feb 26</DateHeader>
			</Box>
			<Box wrap gap="small">
				{players.map(player => (
					<PlayerContainer direction="row" align="center" key={player.id}>
						<ImageWrapper align="center" justify="center" className="container">
							<PlayerImage
								src={player.imageSrc}
								name={player.fullName}
								imageHeight="100%"
								imageWidth="100%"
								noImageHeight="100%"
								noImageWidth="85%"
							/>
						</ImageWrapper>
						<PlayerElement>
							<p>{player.fullName}</p>
						</PlayerElement>
						<PlayerElement>
							<h2>{player.gameCountThisWeek}</h2>
						</PlayerElement>
					</PlayerContainer>
				))}
			</Box>
		</Box>
	)
}

export default InjuryReport
