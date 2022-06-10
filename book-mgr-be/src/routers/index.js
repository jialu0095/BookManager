const auth = require('./auth/index')

module.exports = (app) => {
  // register auth as router
  app.use(auth.routes())
}
