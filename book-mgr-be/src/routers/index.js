const auth = require('./auth/index')
const inviteCode = require('./invite-code/index')

module.exports = (app) => {
  // register auth as router
  app.use(auth.routes())
  app.use(inviteCode.routes())
}
