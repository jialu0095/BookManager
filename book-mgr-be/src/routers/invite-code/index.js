const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const InviteCode = new mongoose.model('InviteCode') // an instance for model 'User'

// create a Router instance for invite
// use prefix 'invite' to represent that this router deal with invite bussiness
const router = new Router({
  prefix: '/invite',
})

router.get('/add', async (ctx) => {
  const code = new InviteCode({
    // generate invite code
    code: uuidv4(),
    user: '',
  })

  // get response data
  const res = await code.save()

  ctx.body = {
    code: 1,
    msg: 'successfully created!',
    data: res,
  }
})

module.exports = router
