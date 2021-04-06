import sendr from '../../types'

const URL_MATCH = /^wss?:\/\//

const isSocketURL = (url: string): url is sendr.socket.URL =>
	URL_MATCH.test(url)

export = isSocketURL
