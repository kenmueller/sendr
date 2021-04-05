import _sendr from '../types'
import Request from './request'
import Error from './error'
import Send from './send'

const sendr = (send: Send) => {
	Request.send = send

	const sendr: typeof _sendr = url => new Request(url)

	sendr.Error = Error as typeof _sendr.Error

	return sendr
}

export = sendr
