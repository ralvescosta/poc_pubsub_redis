class SubController {
  constructor (logger) {
    this._logger = logger
  }

  exec (message, res) {
    this._logger.info(`[SubController] - ${JSON.stringify(message)}`)
    res.status(200).json({})
  }
}

module.exports = { SubController }
