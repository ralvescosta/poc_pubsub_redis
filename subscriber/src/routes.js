module.exports = ({ httpServer, controller }) => ({
  register () {
    httpServer.registerRoute('post', '/v1/api/sub', controller.post.bind(controller))
  }
})
