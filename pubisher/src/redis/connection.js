const redis = require('redis')

module.exports = ({ logger }) => ({
  connection: () => {
    const redisConnection = redis.createClient({
      password: process.env.REDIS_PASS,
      db: process.env.REDIS_DB,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    })

    redisConnection.on('error', function (error) {
      logger.error('[REDIS] - ' + error)
    })

    return redisConnection
  }
})
