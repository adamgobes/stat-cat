const { getUserId } = require('../utils')

function owner(parent, args, context) {
	console.log('this ran')
	const id = getUserId(context)

	return context.prisma.team({ id: parent.id }).owner()
}

function players(parent, args, context) {
	return parent.players
}

module.exports = {
	owner,
	players,
}
