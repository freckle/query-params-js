# @freckle/query-params

Utilities for constructing and using query parameters.

## Install

```sh
yarn add @freckle/query-params
```

## Release

See [RELEASE.md](./RELEASE.md).

## Usage

### `urlWithQueryParams(baseUrl, queryParams)`

Appends a query string to `baseUrl`. `null` and `undefined` values are dropped,
arrays are joined with `,`, and [Moment][] values become epoch milliseconds. When
nothing is left to append, `baseUrl` is returned unchanged.

[Moment]: https://momentjs.com/timezone/

```ts
import {urlWithQueryParams} from '@freckle/query-params'

urlWithQueryParams('/api/students', {grade: 3, active: true})
// '/api/students?grade=3&active=true'

urlWithQueryParams('/api/students', {grade: null, ids: [1, 2, 3]})
// '/api/students?ids=1,2,3'

urlWithQueryParams('/api/students', {})
// '/api/students'
```

Values of any other type throw:

```ts
urlWithQueryParams('/api/students', {a: {b: 1}})
// Error: Invalid type of query param object for key a
```

### `createAPIQueryParams(queryParams)`

The query string on its own, without a base URL or `?`. Returns `null` when every
value was dropped, which is what makes the `urlWithQueryParams` empty case work.

```ts
import {createAPIQueryParams} from '@freckle/query-params'

createAPIQueryParams({a: 1, b: 'x'}) // 'a=1&b=x'
createAPIQueryParams({}) // null
```

### `toQueryParamObj(name, filters)`

Expands a filter object into `name[operator]` keys, for APIs that take
range filters. Supported operators are `in`, `notin`, `gt`, `gte`, `lt` and `lte`.

```ts
import {toQueryParamObj, urlWithQueryParams} from '@freckle/query-params'

toQueryParamObj('score', {gte: 0.5, lt: 0.9})
// {'score[gte]': 0.5, 'score[lt]': 0.9}

urlWithQueryParams('/api/students', toQueryParamObj('score', {gte: 0.5}))
// '/api/students?score[gte]=0.5'
```

### Values are not URL-encoded

Keys and values are interpolated as-is. Anything with a reserved character in it
changes meaning rather than being escaped:

```ts
urlWithQueryParams('/api', {q: 'a&b=c'}) // '/api?q=a&b=c'  -> server reads two params
urlWithQueryParams('/api', {q: 'a#b'}) // '/api?q=a#b'    -> '#b' becomes a fragment
urlWithQueryParams('/api', {name: 'John Smith'}) // '/api?name=John Smith'
```

Pass values that are already safe — ids, numbers, booleans, timestamps, enum
strings — or encode them yourself before passing them in. Free-form text is not
safe to pass directly.

---

[LICENSE](./LICENSE)
