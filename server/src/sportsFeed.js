const base64 = require('base-64')

const { sportsFeedUsername, sportsFeedPassword, sportsFeedUrl } = require('./config')

function sportsFeedRequest(path) {
	const pass = base64.encode(`${sportsFeedUsername}:${sportsFeedPassword}`)
	const config = {
		headers: { Authorization: `Basic ${pass}` },
	}
	return fetch(`${sportsFeedUrl}/${path}`, config)
}

function extractBasicInfo(sportsFeedPlayerObj) {
	return {
		id: sportsFeedPlayerObj.id,
		firstName: sportsFeedPlayerObj.firstName,
		lastName: sportsFeedPlayerObj.lastName,
		fullName: `${sportsFeedPlayerObj.firstName} ${sportsFeedPlayerObj.lastName}`,
		position: sportsFeedPlayerObj.primaryPosition,
		currentTeam: sportsFeedPlayerObj.currentTeam
			? {
					id: sportsFeedPlayerObj.currentTeam.id,
					abbreviation: sportsFeedPlayerObj.currentTeam.abbreviation,
			  }
			: null,
		imageSrc: sportsFeedPlayerObj.officialImageSrc,
	}
}

module.exports = {
	sportsFeedRequest,
	extractBasicInfo,
}
