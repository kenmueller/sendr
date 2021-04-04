import sendr from '../../types'
import RequestOptions, { DEFAULT_REQUEST_OPTIONS } from './options'
import futureResponse from '../response/future'
import joinPaths from '../url/join'
import resolveUrl from '../url/resolve'

export default class Request implements sendr.Request {
	constructor(
		private readonly url: string,
		private readonly options: Readonly<RequestOptions> = DEFAULT_REQUEST_OPTIONS
	) {}

	private readonly map = (options: Partial<RequestOptions>) =>
		new Request(this.url, { ...this.options, ...options })

	private readonly resolvedUrl = () => {
		const { params, query } = this.options
		const url = new URL(this.url)

		for (const [name, value] of Object.entries(query))
			if (!(value === null || value === undefined))
				url.searchParams.append(name, value.toString())

		return resolveUrl(url.href, params)
	}

	readonly path = (...paths: sendr.Path[]) =>
		new Request(joinPaths(this.url, ...paths), { ...this.options })

	readonly params = (params: sendr.Params) =>
		this.map({ params: { ...this.options.params, ...params } })

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

		request.open(method.toUpperCase(), this.resolvedUrl())
		request.send(body)

		return response
	}
}
