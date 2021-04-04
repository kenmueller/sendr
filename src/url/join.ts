import sendr from '../../types'

const join = (...paths: sendr.Path[]) =>
	paths
		.map((_path, index) => {
			let path = _path.toString()

			if (index) path = path.replace(/^\//, '')
			if (index < paths.length - 1) path = path.replace(/\/$/, '')

			return path
		})
		.join('/')

export default join
