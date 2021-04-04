# sendr

> Reusable & declarative queries

```ts
const { data } = await sendr('http://localhost:3000/user/:id')
	.method('post')
	.path('/profile')
	.params({ id: 'ken' })
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
