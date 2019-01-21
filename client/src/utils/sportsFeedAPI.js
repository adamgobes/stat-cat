import base64 from 'base-64'
import axios from 'axios'

import { username, password } from './config'

const pass = base64.encode(`${username}:${password}`)

const config = {
	headers: { Authorization: `Basic ${pass}` },
}

export default () => axios.get('https://api.mysportsfeeds.com/v2.0/pull/nba/players.json', config)
