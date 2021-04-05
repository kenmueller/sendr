import sendr from '../../../../types'

const filterHeaders = (headers: sendr.RequestHeaders) => {
	const filtered: Record<string, string> = {}

	for (const [name, value] of Object.entries(headers))
		if (!(value === null || value === undefined))
			filtered[name] = value.toString()

	return filtered
}

export = filterHeaders
