import https from 'https'
import http from 'http'

const getClient = (url: string) =>
	new URL(url).protocol === 'https:' ? https : http

export = getClient
