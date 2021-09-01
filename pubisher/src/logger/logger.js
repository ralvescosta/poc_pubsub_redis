const pino = require('pino')
const pinoInspector = require('pino-inspector')

const logger = pino({
  enabled: true,
  level: 'trace',
  prettyPrint: true,
  prettifier: pinoInspector
})

module.exports = { logger }
