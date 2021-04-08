import sendr from '../../types'

const VARIABLE_MATCH = /^:(.+)$/

export interface ResolveUrlOptions {
	params: sendr.Params
	query: sendr.Query
}

const resolveUrl = (url: string, { params, query }: ResolveUrlOptions) =>
	resolveQuery(resolveParams(url, params), query)

const resolveParams = (url: string, params: sendr.Params) =>
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

const resolveQuery = (url: string, query: sendr.Query) => {
	const options = new URL(
		url,
		typeof window === 'undefined' ? undefined : window.location.href
	)

	for (const [name, value] of Object.entries(query))
		if (value != null) options.searchParams.append(name, value.toString())

	return options.href
}

export default resolveUrl
