import * as base64 from 'base-64'

import { sportsFeedPassword, sportsFeedUrl, sportsFeedUsername } from '../config'

export function sportsFeedRequest(path): Promise<any> {
    const pass = base64.encode(`${sportsFeedUsername}:${sportsFeedPassword}`)
    const config = {
        headers: { Authorization: `Basic ${pass}` },
    }
    return fetch(`${sportsFeedUrl}/${path}`, config)
}
