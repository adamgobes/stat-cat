import gql from 'graphql-tag'

export default gql`
	fragment BasicPlayerInfo on Player {
		id
		fullName
		currentTeam {
			abbreviation
		}
		position
		imageSrc
	}
`
