const base64 = require('base-64')

const { sportsFeedUsername, sportsFeedPassword, sportsFeedUrl } = require('./config')

function sportsFeedRequest(path) {
	const pass = base64.encode(`${sportsFeedUsername}:${sportsFeedPassword}`)
	const config = {
		headers: { Authorization: `Basic ${pass}` },
	}
	return fetch(`${sportsFeedUrl}/${path}`, config)
}

module.exports = {
	sportsFeedRequest,
}
