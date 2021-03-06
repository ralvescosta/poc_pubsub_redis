require('dotenv').config({ path: '.env' })

const { logger } = require('./logger/logger')
const { HttpServer } = require('./httpServer/sever')
const { RedisClient } = require('./redis/redisClient')
const { PubSubClient } = require('./pubsub/pubsubClient')
const { HttpController } = require('./controller/httpController')

const Routes = require('./routes')

const createRedisConnection = () => {
  const redis = new RedisClient(logger)
  let redisConnection
  try {
    redisConnection = redis.connection()
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

  const pubSubClient = new PubSubClient(redisConnection, logger)
  const httpController = new HttpController(pubSubClient, logger)

  const routes = Routes({ httpServer, controller: httpController })
  routes.register()

  httpServer.run()
})()
