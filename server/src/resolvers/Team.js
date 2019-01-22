const { getUserId } = require('../utils')

function owner(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

module.exports = {
	owner,
}
