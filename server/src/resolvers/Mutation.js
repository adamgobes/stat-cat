const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { APP_SECRET } = require('../utils')
const { getUserId } = require('../utils')

async function register(parents, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.createUser({ ...args, password })

    // initialize user's team when they create an account
    const initialTeam = {
        name: `${user.name}'s Team`,
        owner: { connect: { id: user.id } },
    }

    await context.prisma.createTeam({ ...initialTeam })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function saveTeam(parent, args, context) {
    const userId = getUserId(context)
    const teamId = await context.prisma // get user's team based on their id
        .user({ id: userId })
        .team()
        .id()

    /* In DB, Team.players is simply array of sportsFeed IDs
     * In resolvers/Team.js this array gets mapped to array of actual player objects (see schema.graphql for what that looks like)
     */
    return context.prisma.updateTeam({
        where: { id: teamId },
        data: {
            players: { set: args.playerIds },
        },
    })
}

module.exports = {
    register,
    login,
    saveTeam,
}
