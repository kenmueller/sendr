import sendr from '../../types'
import RequestOptions, { DEFAULT_REQUEST_OPTIONS } from './options'
import joinPaths from '../url/join'
import resolveUrl from '../url/resolve'
import Send from '../send'

class Request implements sendr.Request {
	static send: Send

	constructor(
		readonly url: string,
		readonly options: Readonly<RequestOptions> = DEFAULT_REQUEST_OPTIONS
	) {}

	get resolvedUrl() {
		return resolveUrl(this.url, this.options)
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

	readonly progress = (progress: sendr.Progress) =>
		this.map({ progress: [...this.options.progress, progress] })

	readonly abort = (after: sendr.Timeout) =>
		this.map({
			timeout: typeof after === 'number' ? Math.max(after, 0) : after
		})

	readonly send = <Data>() => Request.send<Data>(this)
}

export = Request
