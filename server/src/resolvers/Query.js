const { getUserId } = require('../utils')

function me(parent, args, context) {
	const id = getUserId(context)

	return context.prisma.user({ id })
}

module.exports = {
	me,
}
