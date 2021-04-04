# sendr

```ts
const { data } = await sendr('http://localhost:3000/user/:id')
	.method('post')
	.params({ id: 'ken' })
	.path('/profile')
	.query({ name: 'ken' })
	.query({ age: 15 })
	.headers({ 'content-type': 'application/json' })
	.body({ name: 'ken' })
	.type('json')
	.send()
	.progress((current, total) => {
		console.log(current, total)
	})
```
