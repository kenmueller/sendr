import sendr from '../../../types'
import OpenSocketOptions from './options'
import Error from '../../error'

class OpenSocket implements sendr.socket.OpenSocket {
	readonly socket: WebSocket

	constructor(readonly url: string, readonly options: OpenSocketOptions) {
		this.socket = new WebSocket(url)

		this.socket.addEventListener('message', ({ data }) => {
			for (const message of this.options.message) message(data)
		})

		this.socket.addEventListener('open', () => {
			for (const open of this.options.open) open()
		})

		this.socket.addEventListener('close', ({ code, reason }) => {
			for (const close of this.options.close) close(code, reason)
		})

		this.socket.addEventListener('error', () => {
			for (const error of this.options.error) error()
		})
	}

	readonly internal = () => this.socket

	readonly state = (): sendr.socket.State => {
		const { readyState, CONNECTING, OPEN, CLOSING, CLOSED } = this.socket

		switch (readyState) {
			case CONNECTING:
				return 'connecting'
			case OPEN:
				return 'open'
			case CLOSING:
				return 'closing'
			case CLOSED:
				return 'closed'
			default:
				throw new Error('state', 'Invalid WebSocket state')
		}
	}

	readonly message = (message: sendr.socket.OnMessage) => {
		this.options.message = [...this.options.message, message]
		return this
	}

	readonly send = (message: sendr.socket.Message) => {
		const state = this.state()

		if (!(state === 'connecting' || state === 'open'))
			throw new Error('closed', 'The socket is closed')

		this.socket.send(message)
		return this
	}

	readonly open = (open: sendr.socket.OnOpen) => {
		this.options.open = [...this.options.open, open]
		return this
	}

	readonly close = (close?: sendr.socket.OnClose) => {
		if (close) {
			this.options.close = [...this.options.close, close]
			return this as never
		}

		const state = this.state()

		if (!(state === 'connecting' || state === 'open'))
			throw new Error('closed', 'The socket is already closed')

		this.socket.close()
		return undefined as never
	}

	readonly error = (error: sendr.socket.OnError) => {
		this.options.error = [...this.options.error, error]
		return this
	}
}

export = OpenSocket
