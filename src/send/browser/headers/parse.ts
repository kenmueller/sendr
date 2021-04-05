import sendr from '../../../../types'

const LINE_SEPARATOR = /[\r\n]+/
const LINE_MATCH = /^(.+?):\s+(.+)$/

const parseHeaders = (lines: string) => {
	const headers: sendr.ResponseHeaders = {}

	for (const line of lines.trim().split(LINE_SEPARATOR)) {
		const match = line.match(LINE_MATCH)
		if (match) headers[match[1]] = match[2]
	}

	return headers
}

export = parseHeaders
