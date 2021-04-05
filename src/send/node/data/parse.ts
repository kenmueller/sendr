import sendr from '../../../../types'

const parseData = (data: string, type: sendr.ResponseType): unknown => {
	switch (type) {
		case 'buffer':
			return Buffer.from(data)
		case 'arraybuffer':
			return Uint8Array.from(Buffer.from(data)).buffer
		case 'blob':
			throw new Error('"blob" is not supported as a response type in node')
		case 'document':
			throw new Error('"document" is not supported as a response type in node')
		case 'json':
			return JSON.parse(data)
		case 'text':
			return data
	}
}

export default parseData
