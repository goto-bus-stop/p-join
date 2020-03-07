var test = require('tape')
var join = require('./')

function delay (ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms)
  })
}

test('resolves in order', function (t) {
  t.plan(3)

  join(
    Promise.resolve(10),
    delay(5).then(function () { return 20 }),
    Promise.resolve(30),
    function (a, b, c) {
      t.is(a, 10)
      t.is(b, 20)
      t.is(c, 30)
    }
  ).catch(t.fail).then(t.end, t.end)
})

test('takes promises or values', function (t) {
  t.plan(3)

  join(
    1,
    Promise.resolve(2),
    3,
    function (a, b, c) {
      t.is(a, 1)
      t.is(b, 2)
      t.is(c, 3)
    }
  ).catch(t.fail).then(t.end, t.end)
})

test('returns result of the join function', function (t) {
  t.plan(1)

  join(
    Promise.resolve(10),
    Promise.resolve(20),
    function (a, b) { return a + b }
  ).then(function (sum) {
    t.is(sum, 30)
  }).catch(t.fail).then(t.end, t.end)
})

test('rejects if any promises reject', function (t) {
  t.plan(1)

  var reason = new Error('hello world')
  join(
    Promise.resolve(10),
    Promise.reject(reason),
    function () {
      t.fail()
    }
  ).then(t.fail, function (err) {
    t.is(err, reason)
  }).then(t.end, t.end)
})
