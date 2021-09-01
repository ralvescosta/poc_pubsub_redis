require('dotenv').config({ path: '.env' })

const HttpServer = require('./httpServer/sever')
const { logger } = require('./logger/logger')
const Redis = require('./redis/connection')
const PubSubClient = require('./pubsub/pubsubClient')
const PubController = require('./controller/pubController')
const Routes = require('./routes')

const createRedisConnection = () => {
  const redis = Redis({ logger })
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
  const httpServer = HttpServer({ logger })
  httpServer.setup()

  const redisConnection = createRedisConnection()

  const pubSubClient = PubSubClient({ redisConnection, logger })
  const pubController = PubController({ pubSubClient, logger })

  const routes = Routes({ httpServer, controller: pubController, logger })
  routes.register()

  httpServer.run()
})()
