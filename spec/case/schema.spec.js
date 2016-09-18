var assertx = require('../../lib/index.js')
describe('hogehoge', function() {
  it('hogehoge', function() {
    var schema = {
      x: (v, key) => {
        return true
      }
    }
    var data = {
      x: true,
      x1: false
    }
    assertx(schema)(data)
  })
})