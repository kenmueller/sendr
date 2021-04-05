import isBrowser from './is/browser'

if (!isBrowser)
	((global as unknown) as Record<
		string,
		unknown
	>).__non_webpack_require__ = require

import _sendr from '../types'
import Request from './request'
import Error from './error'

const sendr: typeof _sendr = url => new Request(url)

sendr.Error = Error as typeof _sendr.Error

export = sendr
