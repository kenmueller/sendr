import { ClientRequest } from 'http'

import sendr from '../../../types'
import Request from '../../request'
import parseData from './data/parse'
import Error from '../../error'

const futureResponse = <Data>(request: Request, sender: ClientRequest) => {
	const progressListeners: sendr.Progress[] = [...request.options.progress]

	const response = new Promise((resolve, reject) => {
		sender.on('response', response => {
			const length = response.headers['content-length']
			const total = length ? parseInt(length) : 0

			let data = ''

			response.on('data', (chunk: Buffer) => {
				const current = Math.min((data += chunk).length, total)

				for (const progress of progressListeners)
					try {
						progress(current, total)
					} catch {}
			})

			response.on('end', () => {
				try {
					resolve({
						status: response.statusCode ?? 200,
						headers: response.headers as sendr.ResponseHeaders,
						data: parseData(data, request.options.type) as Data
					})
				} catch (error) {
					reject(error)
				}
			})
		})

		sender.on('error', reject)

		sender.on('abort', () => {
			reject(new Error('aborted', 'Aborted'))
		})
	}) as sendr.FutureResponse<Data>

	response.progress = progress => {
		progressListeners.push(progress)
		return response
	}

	response.abort = () => {
		sender.destroy()
	}

	return response
}

export = futureResponse
