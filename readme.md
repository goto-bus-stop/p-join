# p-join

Combine results from multiple promises into a single value.

## Installation

With npm:

```bash
npm install --save p-join
```

## Usage

```js
var join = require('p-join')

var result = join(
  Promise.resolve(10),
  Promise.resolve(20),
  function (a, b) { return a + b }
)

result.then(function (sum) {
  assert.equal(sum, 30)
})
```

Compare doing this with `Promise.all`:

```js
var result = Promise.all([
  Promise.resolve(10),
  Promise.resolve(20)
]).then(function (results) { return results[0] + results[1] })

result.then(function (sum) {
  assert.equal(sum, 30)
})
```

## API

### result = require('p-join')(...promises, callback)

Pass Promises or values as separate arguments.
The `callback` receives the resolved values of all `...promises` as arguments, in order.
If `callback` returns a value or a Promise, `result` will resolve with that value.

## License

[MIT](./LICENSE)
