import React from 'react'
import styled from 'styled-components'
import { Box, DataTable, Text } from 'grommet'

import NoImagePlayer from '../../../assets/images/player.png'

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
	box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 16px;
	padding: 12px;
	margin: 10px 0;
	min-width: 300px;
	background-color: white;
`

const PlayerElement = styled(Box)`
	margin: 0 10px;
`

const InjuryReport = ({ injuriesData }) => {
	const { players } = injuriesData
	return (
		<Box justify="center" align="center">
			<WeekHeader>Week Of</WeekHeader>
			<DateHeader>Feb 26</DateHeader>
			{players.map(player => (
				<PlayerContainer direction="row" align="center" key={player.id}>
					<PlayerElement>
						<p>{player.fullName}</p>
					</PlayerElement>
				</PlayerContainer>
			))}
			{/* <DataTable
				columns={[
					{
						property: 'player',
						header: <Text>Player</Text>,
						render: data => (
							<Box>
								<ImageWrapper>
									{data.imageSrc && (
										<img
											src={data.imageSrc}
											height="100%"
											width="100%"
											alt={data.fullName}
										/>
									)}
									{!data.imageSrc && (
										<img
											src={NoImagePlayer}
											height="100%"
											width="85%"
											alt={data.fullName}
										/>
									)}
								</ImageWrapper>
								<Text>{data.fullName}</Text>
							</Box>
						),
						primary: true,
					},
					{
						property: 'team',
						header: <Text>Team</Text>,
						render: data => <Text>{data.currentTeam.abbreviation}</Text>,
					},
					{
						property: 'gameCount',
						header: <Text>Games This Week</Text>,
						render: data => <Text>{data.gameCountThisWeek}</Text>,
					},
					{
						property: 'injury',
						header: <Text>Current Injury</Text>,
						render: data => (
							<Text>{data.injury ? data.injury.playingProbability : 'None'}</Text>
						),
					},
				]}
				data={players}
			/> */}
		</Box>
	)
}

export default InjuryReport
