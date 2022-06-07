const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log('midware1')
  ctx.body = 'midware1'
  await next()
})

app.use(async (ctx) => {
  console.log('midware2')
  ctx.body = 'midware2'
})

app.listen(3000, () => {
  console.log('launched successfully')
})
