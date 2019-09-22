import * as jwt from 'jsonwebtoken'

import { APP_SECRET } from './config.js'

export function getUserId(context): string {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}
