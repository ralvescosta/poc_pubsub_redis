module.exports = ({ httpServer, controller, logger }) => ({
  register () {
    httpServer.registerRoute('post', '/v1/api/pub', controller.post, logger)
  }
})
