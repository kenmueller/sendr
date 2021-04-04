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
	 * Query paramters in the URL.
	 */
	export type Query = Record<string, Value | null | undefined>

	/**
	 * Ignore response cookies in cross-origin requests.
	 */
	export type Credentials = boolean

	/**
	 * Headers that you can pass into the request.
	 * Make the value `null` or `undefined` to remove it.
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
		method(method: Method): Request
		query(query: Query): Request
		credentials(credentials: Credentials): Request
		headers(headers: RequestHeaders): Request
		body(body: Body): Request
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
