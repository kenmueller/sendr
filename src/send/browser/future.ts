import sendr from '../../../types'
import Request from '../../request'
import parseHeaders from './headers/parse'
import Error from '../../error'

const futureResponse = <Data>({ options }: Request, sender: XMLHttpRequest) => {
	let progressListeners: sendr.Progress[] = options.progress

	let timeout =
		options.timeout === null
			? null
			: setTimeout(() => sender.abort(), options.timeout)

	sender.addEventListener('progress', ({ loaded, total }) => {
		const current = Math.min(loaded, total)
		for (const progress of progressListeners) progress(current, total)
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
		progressListeners = [...progressListeners, progress]
		return response
	}

	response.abort = ((after?: sendr.Timeout) => {
		after &&= Math.max(after, 0)

		if (timeout !== null) clearTimeout(timeout)

		if (after === undefined) return sender.abort()
		if (after !== null) timeout = setTimeout(() => sender.abort(), after)

		return response
	}) as never

	return response
}

export = futureResponse
