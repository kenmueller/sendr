import { ClientRequest } from 'http'

import sendr from '../../../types'
import parseData from './data/parse'
import Error from '../../error'

const futureResponse = <Data>(
	request: ClientRequest,
	type: sendr.ResponseType
) => {
	const progressListeners: sendr.Progress[] = []

	const response = new Promise((resolve, reject) => {
		request.on('response', response => {
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
						data: parseData(data, type) as Data
					})
				} catch (error) {
					reject(error)
				}
			})
		})

		request.on('error', reject)

		request.on('abort', () => {
			reject(new Error('aborted', 'Aborted'))
		})
	}) as sendr.FutureResponse<Data>

	response.progress = progress => {
		progressListeners.push(progress)
		return response
	}

	response.abort = () => {
		request.destroy()
	}

	return response
}

export = futureResponse
