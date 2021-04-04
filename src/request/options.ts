import sendr from '../../types'

export default interface RequestOptions {
	method: sendr.Method
	query: sendr.Query
	credentials: sendr.Credentials
	headers: sendr.RequestHeaders
	body: sendr.Body
	type: sendr.ResponseType
}

export const DEFAULT_REQUEST_OPTIONS: RequestOptions = {
	method: 'get',
	query: {},
	credentials: false,
	headers: {},
	body: null,
	type: 'text'
}
