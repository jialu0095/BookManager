const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

// connect must be required before routers
const { connect } = require('./db/index') // get connect fn to connect mongo
const routes = require('./routers/index') // require auth router as routes
const app = new Koa()

// only when the db is connected will the port be listened and accept requests
connect().then(() => {
  app.use(cors())
  app.use(koaBody())
  routes(app)

  // app.listen: listen to port 3000 and post a http request, and response after processing
  // default URL: localhost
  app.listen(3000, () => {
    console.log('launched successfully')
  })
})
