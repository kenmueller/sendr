# sendr

```ts
const { data } = await sendr('http://localhost:3000')
	.method('post')
	.query({ name: 'ken' })
	.query({ age: 15 })
	.headers({ 'content-type': 'application/json' })
	.body({ name: 'ken' })
	.send()
	.progress((current, total) => {
		console.log(current, total)
	})
```
