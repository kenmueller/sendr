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
	 * A number representing milliseconds.
	 */
	export type Milliseconds = number

	/**
	 * Request timeout.
	 * `null` terminates the timeout.
	 */
	export type Timeout = Milliseconds | null

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
	 * Include credentials in cross-origin requests.
	 */
	export type Credentials = boolean

	/**
	 * Headers that you can pass into the request.
	 */
	export type RequestHeaders = Record<string, Value | null | undefined>

	/**
	 * Headers that are sent back from a response.
	 */
	export type ResponseHeaders = Record<string, string | string[]>

	/**
	 * The request body.
	 */
	export type Body = BodyInit | Document | null | undefined

	/**
	 * The response type.
	 */
	export type ResponseType =
		| 'buffer'
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
		 * Include credentials in cross-origin requests.
		 */
		credentials(credentials: Credentials): Request

		/**
		 * Add or remove headers.
		 * Set the value to `null` or `undefined` to remove them.
		 */
		headers(headers: RequestHeaders): Request

		/**
		 * Set the request body.
		 */
		body(body: Body): Request

		/**
		 * Set the response type.
		 */
		type(type: ResponseType): Request

		/**
		 * Listen for the progress of the request.
		 */
		progress(progress: Progress): Request

		/**
		 * Set a timeout for the request.
		 * Set the value to `null` to remove the timeout.
		 * Causes the request to fail with code `aborted` after the timeout.
		 */
		abort(after: Timeout): Request

		/**
		 * Send the request.
		 */
		send<Data>(): FutureResponse<Data>
	}

	export interface FutureResponse<Data> extends Promise<Response<Data>> {
		/**
		 * Listen for the progress of the request.
		 */
		progress(progress: Progress): FutureResponse<Data>

		/**
		 * Abort the request.
		 * Causes the request to fail with code `aborted`.
		 */
		abort(): void

		/**
		 * Set a timeout for the request.
		 * Set the value to `null` to remove the timeout.
		 * Causes the request to fail with code `aborted` after the timeout.
		 */
		abort(after: Timeout): FutureResponse<Data>
	}

	export interface Response<Data> {
		status: number
		headers: ResponseHeaders
		data: Data
	}

	export type Socket = socket.Socket

	export namespace socket {
		export type URL = `ws://${string}` | `wss://${string}`

		export type Message = (message: string) => void

		export interface Socket {
			/**
			 * Append to the socket URL.
			 */
			path(...paths: Path[]): Socket

			/**
			 * Add or remove URL parameters.
			 * Set the value to `null` or `undefined` to remove them.
			 */
			params(params: Params): Socket

			/**
			 * Add or remove query parameters.
			 * Set the value to `null` or `undefined` to remove them.
			 */
			query(query: Query): Socket

			/**
			 * Open the socket connection.
			 */
			open(): Socket

			/**
			 * Send a message to the server.
			 */
			send(): Socket

			/**
			 * Listen for incoming messages.
			 */
			message(message: Message): Socket

			/**
			 * Close the socket connection.
			 */
			close(): void
		}
	}
}

declare function sendr(url: sendr.socket.URL): sendr.Socket
declare function sendr(url: string): sendr.Request

export = sendr
