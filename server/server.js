import express from 'express'
import path from 'path'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'

const webpackConfig = require('../webpack.config.js')({ dev: true })
const compiler = webpack(webpackConfig)

const app = express()

app.use(express.static(
  path.resolve(__dirname, '..', 'public')
))

if (process.env.NODE_ENV === 'development') {

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
    },
  }))

  app.use(webpackHotMiddleware(compiler, { // eslint-disable-line global-require
    log: console.log, // eslint-disable-line no-console
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
}

app.get('/minesweeper', (req, res) => {
  // render template
  res.sendFile(path.resolve(__dirname, 'utils/index.html'))
})
app.listen(3000)
