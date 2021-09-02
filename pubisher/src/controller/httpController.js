class HttpController {
  constructor (pubSubClient, logger) {
    this._pubSubClient = pubSubClient
    this._logger = logger
  }

  post (req, res) {
    const { body } = req

    this._pubSubClient.registerChannel(body.requestId)

    const timeOutStrategy = setTimeout((res, channel, pubSubClient) => {
      pubSubClient.unsubscribe(channel)
      res.status(503).json({ error: 'Time out' })
    }, 60000, res, body.requestId, this._pubSubClient)

    this._pubSubClient.pushRequestBuffer({ id: body.requestId, res, timeOutStrategy })
  }
}

module.exports = { HttpController }
