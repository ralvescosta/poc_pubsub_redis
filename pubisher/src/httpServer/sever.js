const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const server = express()

module.exports = ({ logger }) => ({
  setup: () => {
    server.use(cors())
    server.use(helmet())
    server.use(express.json())
    server.use(morgan('combined'))
  },

  registerRoute: (method, path, handler) => {
    server[method](path, handler)
  },

  run: () => {
    const port = process.env.PORT || 3333
    server.listen(port, () => logger.info(`[APP] - server running on port ${port}`))
  }
})
