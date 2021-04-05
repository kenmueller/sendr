const sendr = require('..')

sendr('https://jsonplaceholder.typicode.com/todos/1')
	.type('json')
	.send()
	.then(console.log)
	.catch(console.error)
