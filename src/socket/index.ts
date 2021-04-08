import sendr from '../../types'
import SocketOptions, { DEFAULT_SOCKET_OPTIONS } from './options'
import OpenSocket from './open'
import resolveUrl from '../url/resolve'
import joinPaths from '../url/join'

class Socket implements sendr.Socket {
	constructor(
		readonly url: string,
		readonly options: SocketOptions = DEFAULT_SOCKET_OPTIONS
	) {}

	get resolvedUrl() {
		return resolveUrl(this.url, this.options)
	}

	readonly map = (options: Partial<SocketOptions>) =>
		new Socket(this.url, { ...this.options, ...options })

	readonly path = (...paths: sendr.Path[]) =>
		new Socket(joinPaths(this.url, ...paths), this.options)

	readonly params = (params: sendr.Params) =>
		this.map({ params: { ...this.options.params, ...params } })

	readonly query = (query: sendr.Query) =>
		this.map({ query: { ...this.options.query, ...query } })

	readonly message = (message: sendr.socket.OnMessage) =>
		this.map({ message: [...this.options.message, message] })

	readonly open = (open?: sendr.socket.OnOpen) =>
		(open
			? this.map({ open: [...this.options.open, open] })
			: new OpenSocket(this.resolvedUrl, this.options)) as never

	readonly close = (close: sendr.socket.OnClose) =>
		this.map({ close: [...this.options.close, close] })

	readonly error = (error: sendr.socket.OnError) =>
		this.map({ error: [...this.options.error, error] })
}

export = Socket
