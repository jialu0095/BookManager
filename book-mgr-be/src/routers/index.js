const auth = require('./auth/index')
const inviteCode = require('./invite-code/index')
const book = require('./book/index')

module.exports = (app) => {
  // register auth as router
  app.use(auth.routes())
  app.use(inviteCode.routes())
  app.use(book.routes())
}
