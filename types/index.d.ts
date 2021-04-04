declare namespace sendr {
	export interface Value {
		toString(): string
	}

	export type ErrorCode = 'unknown' | 'aborted'

	export class Error extends globalThis.Error {
		code: ErrorCode
	}

	/**
	 * The request method.
	 */
	export type Method =
		| 'get'
		| 'head'
		| 'post'
		| 'put'
		| 'delete'
		| 'connect'
		| 'options'
		| 'trace'
		| 'patch'

	/**
	 * Path segment.
	 */
	export type Path = Value

	/**
	 * URL parameters.
	 */
	export type Params = Record<string, Value | null | undefined>

	/**
	 * Query paramters in the URL.
	 */
	export type Query = Record<string, Value | null | undefined>

	/**
	 * Ignore response cookies in cross-origin requests.
	 */
	export type Credentials = boolean

	/**
	 * Headers that you can pass into the request.
	 */
	export type RequestHeaders = Record<string, Value | null | undefined>

	/**
	 * Headers that are sent back from a response.
	 */
	export type ResponseHeaders = Record<string, string>

	/**
	 * The request body.
	 */
	export type Body = BodyInit | Document | null | undefined

	/**
	 * The response type.
	 */
	export type ResponseType =
		| 'arraybuffer'
		| 'blob'
		| 'document'
		| 'json'
		| 'text'

	/**
	 * Keep track of the request's progress.
	 */
	export type Progress = (current: number, total: number) => void

	export interface Request {
		/**
		 * Append to the request URL.
		 */
		path(...paths: Path[]): Request

		/**
		 * Add or remove URL parameters.
		 * Set the value to `null` or `undefined` to remove them.
		 */
		params(params: Params): Request

		/**
		 * Set the request method.
		 */
		method(method: Method): Request

		/**
		 * Add or remove query parameters.
		 * Set the value to `null` or `undefined` to remove them.
		 */
		query(query: Query): Request

		/**
		 * Set the request credentials mode.
		 */
		credentials(credentials: Credentials): Request

		/**
		 * Add or remove headers.
		 * Set the value to `null` or `undefined` to remove them.
		 */
		headers(headers: RequestHeaders): Request

		/**
		 * Set the request body
		 */
		body(body: Body): Request

		/**
		 * Set the response type.
		 */
		type(type: ResponseType): Request

		/**
		 * Send the request.
		 */
		send<Data>(): FutureResponse<Data>
	}

	export interface FutureResponse<Data> extends Promise<Response<Data>> {
		progress(progress: Progress): FutureResponse<Data>
		abort(): void
	}

	export interface Response<Data> {
		status: number
		headers: ResponseHeaders
		data: Data
	}
}

declare function sendr(url: string): sendr.Request

export = sendr
