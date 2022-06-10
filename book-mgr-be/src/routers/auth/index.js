const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

const User = new mongoose.model('User') // an instance for model 'User'

// create a Router instance for auth
// use prefix 'auth' to represent that this router deal with auth bussiness
const router = new Router({
  prefix: '/auth',
})

// call the cb fn when /auth/register made a POST request
router.post('/register', async (ctx) => {
  // get req data from post req
  const { account, password } = getBody(ctx)

  // check if this account is already in the 'User' model
  const one = await User.findOne({
    account,
  }).exec()
  // if true
  if (one) {
    ctx.body = {
      code: 0,
      msg: 'Account already existed',
      data: null,
    }
    return
  }

  const user = new User({
    account,
    password,
  })

  // get response data
  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: 'successfully registered',
    data: res,
  }
})

router.post('/login', async (ctx) => {
  const { account, password } = getBody(ctx)

  const one = await User.findOne({
    account,
    password,
  })

  console.log('one')

  const user = new User({
    account,
    password,
  })

  const res = await user.save()
  ctx.body = {
    code: 1,
    msg: 'successfully logined',
    data: res,
  }
})

module.exports = router
