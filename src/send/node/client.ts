import { https, http } from 'follow-redirects'

const getClient = (url: string) =>
	(new URL(url).protocol === 'https:' ? https : http) as typeof import('http')

export = getClient
