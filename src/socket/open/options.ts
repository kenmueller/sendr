import sendr from '../../../types'

export default interface OpenSocketOptions {
	message: sendr.socket.OnMessage[]
	open: sendr.socket.OnOpen[]
	close: sendr.socket.OnClose[]
	error: sendr.socket.OnError[]
}
