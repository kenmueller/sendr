import sendr from '../../../../types'

const filterType = (type: sendr.ResponseType): XMLHttpRequestResponseType => {
	switch (type) {
		case 'buffer':
			throw new Error(
				'"buffer" is not supported as a response type in the browser'
			)
		default:
			return type
	}
}

export = filterType
