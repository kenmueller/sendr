# sendr

> An isomorphic request library with reusable & declarative queries

## Install

```bash
npm i sendr
```

```html
<script src="https://wzrd.in/standalone/sendr@1.2.1"></script>
```

## Import

```ts
import sendr from 'sendr'
```

```ts
const sendr = require('sendr')
```

## Request

Requests are **immutable** - every modifier creates a new request, allowing reusability and templating.

```ts
const todo = 'https://jsonplaceholder.typicode.com/todos/:id'

const { status, headers, data } = await sendr(todo)
	.params({ id: 1 })
	.type('json')
	.send()
	.progress((current, total) => {
		console.log(`${((current / total) * 100).toFixed(2)}%`)
	})

console.log(data)
```

## Modifiers

### `path`

Append to the request URL.

```ts
function path(...paths: sendr.Path[]): sendr.Request

sendr('/users').path('ken')
```

### `params`

Add or remove URL parameters. Set the value to `null` or `undefined` to remove them.

```ts
function params(params: sendr.Params): sendr.Request

sendr('/users/:id').params({ id: 'ken' })
```

### `method`

Set the request method.

```ts
function method(method: sendr.Method): sendr.Request

sendr('/posts').method('post')
```

### `query`

Add or remove query parameters. Set the value to `null` or `undefined` to remove them.

```ts
function query(query: sendr.Query): sendr.Request

sendr('/users').query({ order: 'ascending' })
```

### `credentials`

Include credentials in cross-origin requests.

```ts
function credentials(credentials: sendr.Credentials): sendr.Request

sendr('https://example.com/posts').method('post').credentials(true) // true or false
```

### `headers`

Add or remove headers. Set the value to `null` or `undefined` to remove them.

```ts
function headers(headers: sendr.RequestHeaders): sendr.Request

sendr('/messages')
	.method('post')
	.headers({ 'content-type': 'application/json' })
```

### `body`

Set the request body.

```ts
function body(body: sendr.Body): sendr.Request

sendr('/messages')
	.method('post')
	.headers({ 'content-type': 'application/json' })
	.body(JSON.stringify({ message: 'Hello from sendr!' }))
```

### `type`

Set the response type.

```ts
function type(type: sendr.ResponseType): sendr.Request

sendr('https://jsonplaceholder.typicode.com/todos/:id')
	.params({ id: 1 })
	.type('json')
```

## Publishers

### `send`

Send the request. Returns a `Promise` containing the response.

```ts
function send<Data>(): sendr.FutureResponse<Data>

const { data } = await sendr('/users/ken.png').send()
```

### `progress`

Listen for the progress of the request.

```ts
function progress(progress: sendr.Progress): sendr.Request
function progress(progress: sendr.Progress): sendr.FutureResponse<Data>

const { data } = await sendr('/users/ken.png')
	.progress((current, total) => {
		// Before send
		console.log(`Progress #1: ${((current / total) * 100).toFixed(2)}%`)
	})
	.send()
	.progress((current, total) => {
		// After send
		console.log(`Progress #2: ${((current / total) * 100).toFixed(2)}%`)
	})
```

### `abort`

Abort the request. Causes the request to fail with code `aborted`.

```ts
function abort(): void

sendr('/users/ken.png').send().abort()
```

### `abort` (timeout)

Set a timeout for the request. Set the value to `null` or `undefined` to remove the timeout. Causes the request to fail with code `aborted` after the timeout.

```ts
function abort(after: sendr.Timeout): sendr.Request
function abort(after: sendr.Timeout): sendr.FutureResponse<Data>

sendr('/users/ken.png')
	.abort(50) // Timeout of 50ms
	.send()
	.abort(null) // Remove the timeout
	.abort(300) // Set a new timeout of 300ms
```
