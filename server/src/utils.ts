import * as jwt from 'jsonwebtoken'

export function getUserId(context): string {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, process.env.APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}
