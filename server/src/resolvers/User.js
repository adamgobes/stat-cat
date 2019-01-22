const { getUserId } = require('../utils')

function team(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id }).userTeam()
}

module.exports = {
	team,
}
