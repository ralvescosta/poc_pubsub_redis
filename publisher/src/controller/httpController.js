class HttpController {
  constructor (pubSubClient, logger) {
    this._pubSubClient = pubSubClient
    this._logger = logger
  }

  post (req, res) {
    this._logger.info('[HttpController] - Publishing')
    const { body } = req

    this._pubSubClient.pub(body.requestId, body)

    res.status(200).json({ })
  }
}

module.exports = { HttpController }
