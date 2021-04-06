import Send from '..'
import Request from '../../request'
import filterHeaders from './headers/filter'
import getClient from './client'
import futureResponse from './future'

const send: Send = <Data>(request: Request) => {
	const { resolvedUrl: url, options } = request
	const { method, headers, body } = options

	const sender = getClient(url).request(url, {
		method: method.toUpperCase(),
		headers: filterHeaders(headers)
	})

	const response = futureResponse<Data>(request, sender)

	if (body != null) sender.write(body)
	sender.end()

	return response
}

export = send
