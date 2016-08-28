const resolve = require('path').resolve
const config = JSON.parse(
  require('fs').readFileSync(resolve(__dirname, '..', '.babelrc'), 'utf-8')
)

// babel register hook
require('babel-register')(config)
require('../server/server.js')
