import https from 'https'
import http from 'http'

import Send from '..'
import Request from '../../request'
import filterHeaders from './headers/filter'
import futureResponse from './future'

const send: Send = <Data>({ resolvedUrl: url, options }: Request) => {
	const client = new URL(url).protocol === 'https:' ? https : http

	const { method, headers, body, type } = options
	const request = client.request(url, {
		method: method.toUpperCase(),
		headers: filterHeaders(headers)
	})

	const response = futureResponse<Data>(request, type)

	if (!(body === null || body === undefined)) request.write(body)
	request.end()

	return response
}

export = send
