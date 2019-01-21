const { getUserId } = require('../utils')

function allUsers(parent, args, context) {
    const id = getUserId(context)

    return context.prisma.users()
}

module.exports = {
    allUsers,
}
