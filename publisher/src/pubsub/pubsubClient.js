class PubSubClient {
  constructor (redisConnection, logger) {
    this._redisConnection = redisConnection
    this._logger = logger
  }

  pub (channel, msg) {
    this._logger.info(`[PubSubClient] - Publishing in a channel: ${channel}`)
    this._redisConnection.publisher(channel, msg)
  }
}

module.exports = { PubSubClient }
