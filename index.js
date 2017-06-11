module.exports = function join () {
  var self = this
  var promises = arguments.length - 1
  var cb = arguments[promises]

  var results = []
  var resolve, reject
  var resultPromise = new Promise(function (_resolve, _reject) {
    resolve = _resolve
    reject = _reject
  })
  var resolved = 0

  function putResult (promise, i) {
    Promise.resolve().then(function () {
      return promise
    }).then(function (result) {
      results[i] = result
      resolved++
      if (resolved === promises) {
        resolve(cb.apply(self, results))
      }
    }, reject)
  }

  for (var i = 0; i < promises; i++) {
    putResult(arguments[i], i)
  }
  return resultPromise
}
