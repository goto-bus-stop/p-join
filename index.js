module.exports = function join () {
  var self = this
  var cb = arguments[arguments.length - 1]
  var promises = []
  for (var i = 0; i < arguments.length - 1; i++) {
    promises.push(arguments[i])
  }

  return Promise.all(promises).then(function (results) {
    return cb.apply(self, results)
  })
}
