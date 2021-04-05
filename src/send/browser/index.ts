import Send from '..'
import Request from '../../request'
import filterType from './type/filter'
import futureResponse from './future'

const send: Send = <Data>({ resolvedUrl: url, options }: Request) => {
	const { method, credentials, headers, body, type } = options
	const request = new XMLHttpRequest()

	request.withCredentials = credentials
	request.responseType = filterType(type)

	for (const [name, value] of Object.entries(headers))
		if (!(value === null || value === undefined))
			request.setRequestHeader(name, value.toString())

	const response = futureResponse<Data>(request)

	request.open(method.toUpperCase(), url)
	request.send(body)

	return response
}

export = send
