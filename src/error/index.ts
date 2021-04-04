import sendr from '../../types'

export default class Error extends globalThis.Error implements sendr.Error {
	constructor(public code: sendr.ErrorCode, message: string) {
		super(message)
	}
}
