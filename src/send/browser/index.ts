import Send from '..'
import Request from '../../request'
import filterType from './type/filter'
import futureResponse from './future'

const send: Send = <Data>(request: Request) => {
	const { resolvedUrl: url, options } = request
	const { method, credentials, headers, body, type } = options

	const sender = new XMLHttpRequest()

	sender.withCredentials = credentials
	sender.responseType = filterType(type)

	for (const [name, value] of Object.entries(headers))
		if (value != null) sender.setRequestHeader(name, value.toString())

	const response = futureResponse<Data>(request, sender)

	sender.open(method.toUpperCase(), url)
	sender.send(body as BodyInit | Document | null | undefined)

	return response
}

export = send
