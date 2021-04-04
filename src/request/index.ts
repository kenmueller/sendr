import sendr from '../../types'
import RequestOptions, { DEFAULT_REQUEST_OPTIONS } from './options'
import futureResponse from '../response/future'
import join from '../url/join'

export default class Request implements sendr.Request {
	constructor(
		private readonly url: string,
		private readonly options: Readonly<RequestOptions> = DEFAULT_REQUEST_OPTIONS
	) {}

	private readonly map = (options: Partial<RequestOptions>) =>
		new Request(this.url, { ...this.options, ...options })

	private readonly urlWithQuery = () => {
		const url = new URL(this.url)

		for (const [name, value] of Object.entries(this.options.query))
			if (!(value === null || value === undefined))
				url.searchParams.append(name, value.toString())

		return url.href
	}

	readonly path = (...paths: sendr.Path[]) =>
		new Request(join(this.url, ...paths), { ...this.options })

	readonly params = (params: sendr.Params) => this

	readonly method = (method: sendr.Method) => this.map({ method })

	readonly query = (query: sendr.Query) =>
		this.map({ query: { ...this.options.query, ...query } })

	readonly credentials = (credentials: sendr.Credentials) =>
		this.map({ credentials })

	readonly headers = (headers: sendr.RequestHeaders) =>
		this.map({ headers: { ...this.options.headers, ...headers } })

	readonly body = (body: sendr.Body) => this.map({ body })

	readonly type = (type: sendr.ResponseType) => this.map({ type })

	readonly send = <Data>() => {
		const { method, credentials, headers, body, type } = this.options
		const request = new XMLHttpRequest()

		request.withCredentials = credentials
		request.responseType = type

		for (const [name, value] of Object.entries(headers))
			if (!(value === null || value === undefined))
				request.setRequestHeader(name, value.toString())

		const response = futureResponse<Data>(request)

		request.open(method.toUpperCase(), this.urlWithQuery())
		request.send(body)

		return response
	}
}
