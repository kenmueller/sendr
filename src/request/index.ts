import sendr from '../../types'
import RequestOptions, { DEFAULT_REQUEST_OPTIONS } from './options'
import isBrowser from '../is/browser'
import joinPaths from '../url/join'
import resolveUrl from '../url/resolve'
import Send from '../send'

class Request implements sendr.Request {
	constructor(
		readonly url: string,
		readonly options: Readonly<RequestOptions> = DEFAULT_REQUEST_OPTIONS
	) {}

	get resolvedUrl() {
		const { params, query } = this.options
		const url = new URL(this.url, isBrowser ? window.location.href : undefined)

		for (const [name, value] of Object.entries(query))
			if (!(value === null || value === undefined))
				url.searchParams.append(name, value.toString())

		return resolveUrl(url.href, params)
	}

	readonly map = (options: Partial<RequestOptions>) =>
		new Request(this.url, { ...this.options, ...options })

	readonly path = (...paths: sendr.Path[]) =>
		new Request(joinPaths(this.url, ...paths), this.options)

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
		const send: Send = isBrowser
			? require('../send/browser')
			: __non_webpack_require__('./send/node')

		return send<Data>(this)
	}
}

export = Request
