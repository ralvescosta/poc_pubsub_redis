class SubController {
  constructor (logger) {
    this._logger = logger
  }

  exec (message, res) {
    this._logger.info(`[SubController] - ${message}`)
    return res.status(200).json({})
  }
}

module.exports = { SubController }
