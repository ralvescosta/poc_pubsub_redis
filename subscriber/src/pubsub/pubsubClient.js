class PubSubClient {
  constructor (redisConnection, subController, logger) {
    this._redisConnection = redisConnection
    this._subController = subController
    this._logger = logger
    this._reqBuffer = []
  }

  registerChannel (channel) {
    this._logger.info(`[PubSubClient] - Subscribe channel: ${channel}`)
    this._redisConnection.subscribe(channel)
  }

  unsubscribe (channel) {
    this._logger.info(`[PubSubClient] - Unsubscribe channel: ${channel}`)
    this._redisConnection.unsubscribe(channel)
  }

  onMessage () {
    this._redisConnection.on('message', (channel, message) => {
      this._logger.info(`[PubSubClient] - Received message in a channel: ${channel}`)
      const request = this._reqBuffer.find(item => item.id === channel)
      if (request) {
        this._logger.info('[PubSubClient] - Clear TimeOut')
        clearTimeout(request.timeOutStrategy)
        this._subController.exec(message, request.res)
      }
    })
  }

  pushRequestBuffer (request) {
    this._logger.info(`[PubSubClient] - Register request: ${request.requestId}`)
    this._reqBuffer.push(request)
  }
}

module.exports = { PubSubClient }
