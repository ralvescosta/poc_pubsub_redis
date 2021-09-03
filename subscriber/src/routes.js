module.exports = ({ httpServer, controller }) => ({
  register () {
    httpServer.registerRoute('post', '/v1/api/pub', controller.post.bind(controller))
  }
})
