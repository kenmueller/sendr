import sendr from '../../types'
import SocketOptions, { DEFAULT_SOCKET_OPTIONS } from './options'

class Socket {
	constructor(
		readonly url: string,
		readonly options: SocketOptions = DEFAULT_SOCKET_OPTIONS
	) {}
}

export = Socket
