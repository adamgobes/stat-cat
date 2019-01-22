const { getUserId } = require('../utils')

function allUsers(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.users()
}

function userTeam(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.userTeam({ id })
}

module.exports = {
	allUsers,
	userTeam,
}
