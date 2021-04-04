import sendr from '../../types'

const joinPaths = (...paths: sendr.Path[]) =>
	paths
		.map((_path, index) => {
			let path = _path.toString()

			if (index > 0) path = path.replace(/^\//, '')
			if (index < paths.length - 1) path = path.replace(/\/$/, '')

			return path
		})
		.join('/')

export default joinPaths
