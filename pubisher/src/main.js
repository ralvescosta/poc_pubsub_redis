require('dotenv').config({ path: '.env' })

const { logger } = require('./logger/logger')
const { HttpServer } = require('./httpServer/sever')
const { RedisClient } = require('./redis/redisClient')
const { PubSubClient } = require('./pubsub/pubsubClient')
const { HttpController } = require('./controller/httpController')
const { SubController } = require('./controller/subController')
const Routes = require('./routes')

const createRedisConnection = () => {
  const redis = new RedisClient(logger)
  let redisConnection
  try {
    redisConnection = redis.connection()
    // if (!redisConnection.ping()) {
    //   logger.error('[REDIS] - Connection Error')
    //   process.exit(1)
    // }
  } catch (err) {
    logger.error('[REDIS] - ' + err)
    process.exit(1)
  }

  return redisConnection
}

;(() => {
  const httpServer = new HttpServer(logger)
  httpServer.setup()

  const redisConnection = createRedisConnection()

  const subController = new SubController(logger)
  const pubSubClient = new PubSubClient(redisConnection, subController, logger)
  const httpController = new HttpController(pubSubClient, logger)

  const routes = Routes({ httpServer, controller: httpController })
  routes.register()
  pubSubClient.onMessage()

  httpServer.run()
})()
