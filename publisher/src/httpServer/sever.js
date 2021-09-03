const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

class HttpServer {
  constructor (logger) {
    this._logger = logger
    this._server = express()
  }

  setup () {
    this._server.use(cors())
    this._server.use(helmet())
    this._server.use(express.json())
    this._server.use(morgan('combined'))
  }

  registerRoute (method, path, handler) {
    this._server[method](path, handler)
  }

  run () {
    const port = process.env.PORT || 3333
    this._server.listen(port, () => this._logger.info(`[APP] - server running on port ${port}`))
  }
}

module.exports = { HttpServer }
