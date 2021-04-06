import sendr from '../../../types'
import Request from '../../request'
import parseHeaders from './headers/parse'
import Error from '../../error'

const futureResponse = <Data>(request: Request, sender: XMLHttpRequest) => {
	const progressListeners: sendr.Progress[] = [...request.options.progress]

	sender.addEventListener('progress', ({ loaded, total }) => {
		const current = Math.min(loaded, total)

		for (const progress of progressListeners)
			try {
				progress(current, total)
			} catch {}
	})

	const response = new Promise((resolve, reject) => {
		sender.addEventListener('load', () => {
			resolve({
				status: sender.status,
				headers: parseHeaders(sender.getAllResponseHeaders()),
				data: sender.response
			})
		})

		sender.addEventListener('error', () => {
			reject(new Error('unknown', 'An unknown error occurred'))
		})

		sender.addEventListener('abort', () => {
			reject(new Error('aborted', 'Aborted'))
		})
	}) as sendr.FutureResponse<Data>

	response.progress = progress => {
		progressListeners.push(progress)
		return response
	}

	response.abort = () => {
		sender.abort()
	}

	return response
}

export = futureResponse
