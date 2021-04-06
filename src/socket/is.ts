import sendr from '../../types'

const URL_MATCH = /^wss?:\/\//

const isSocketURL = (url: string): url is sendr.SocketURL => URL_MATCH.test(url)

export = isSocketURL
