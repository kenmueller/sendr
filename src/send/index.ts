import sendr from '../../types'
import Request from '../request'

type Send = <Data>(request: Request) => sendr.FutureResponse<Data>

export default Send
