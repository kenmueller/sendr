import sendr from '../../types'

const VARIABLE_MATCH = /^:(.+)$/

const resolveUrl = (url: string, params: sendr.Params) =>
	url
		.split('/')
		.map(part => {
			const match = part.match(VARIABLE_MATCH)
			if (!match) return part

			const key = match[1]

			const value = params[key]
			if (value == null) throw new Error(`Missing value for param "${key}"`)

			return encodeURIComponent(value.toString())
		})
		.join('/')

export = resolveUrl
