import sendr from '../../types'
import OpenSocketOptions from './open/options'

export default interface SocketOptions extends OpenSocketOptions {
	params: sendr.Params
	query: sendr.Query
	message: sendr.socket.OnMessage[]
	open: sendr.socket.OnOpen[]
	close: sendr.socket.OnClose[]
	error: sendr.socket.OnError[]
}

export const DEFAULT_SOCKET_OPTIONS: SocketOptions = {
	params: {},
	query: {},
	message: [],
	open: [],
	close: [],
	error: []
}
