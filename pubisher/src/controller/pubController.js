
module.exports = ({ pubSubClient, logger }) => ({
  post: (req, res) => {
    const { body } = req

    const subscriber = pubSubClient.createSubscriber(body.requestId)

    const timeOutStrategy = setTimeout((res, subscriber) => {
      subscriber.quit()
      res.status(503).json({ error: 'Time out' })
    }, 60000, res, subscriber)

    subscriber.onMessage(res, timeOutStrategy)

    res.json({})
  }
})
