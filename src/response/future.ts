import sendr from '../../types'
import getHeaders from './headers'
import Error from '../error'

const futureResponse = <Data>(request: XMLHttpRequest) => {
	const progressListeners: sendr.Progress[] = []

	request.addEventListener('progress', ({ loaded, total }) => {
		for (const progress of progressListeners) progress(loaded, total)
	})

	const response = new Promise((resolve, reject) => {
		request.addEventListener('load', () => {
			resolve({
				status: request.status,
				headers: getHeaders(request.getAllResponseHeaders()),
				data: request.response
			})
		})

		request.addEventListener('error', () => {
			reject(new Error('unknown', 'An unknown error occurred'))
		})

		request.addEventListener('abort', () => {
			reject(new Error('aborted', 'Aborted'))
		})
	}) as sendr.FutureResponse<Data>

	response.progress = progress => {
		progressListeners.push(progress)
		return response
	}

	response.abort = () => {
		request.abort()
	}

	return response
}

export default futureResponse
