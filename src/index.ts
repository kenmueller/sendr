import _sendr from '../types'
import Request from './request'
import Error from './error'
import Send from './send'
import Socket from './socket'
import isSocketURL from './socket/is'

const sendr = (send: Send) => {
	Request.send = send

	const sendr = (((url: string) =>
		new (isSocketURL(url) ? Socket : Request)(url)) as unknown) as typeof _sendr

	sendr.Error = Error as typeof _sendr.Error

	return sendr
}

export = sendr
