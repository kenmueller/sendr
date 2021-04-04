import _sendr from '../types'
import Error from './error'
import Request from './request'

const sendr: typeof _sendr = url => new Request(url)

sendr.Error = Error as typeof _sendr.Error

export = sendr
