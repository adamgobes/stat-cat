const { getUserId } = require('../utils')

function allUsers(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.users()
}

function me(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

module.exports = {
	allUsers,
	me,
}
