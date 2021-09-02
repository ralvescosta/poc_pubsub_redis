const redis = require('redis')

class RedisClient {
  constructor (logger) {
    this._logger = logger
  }

  connection () {
    const redisConnection = redis.createClient({
      password: process.env.REDIS_PASS,
      db: process.env.REDIS_DB,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    })

    redisConnection.on('error', (error) => {
      this._logger.error('[REDIS] - ' + error)
    })

    return redisConnection
  }
}

module.exports = { RedisClient }
