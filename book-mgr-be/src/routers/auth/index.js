const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const jwt = require('jsonwebtoken')

const User = new mongoose.model('User') // an instance for model 'User'
const InviteCode = mongoose.model('InviteCode')

// create a Router instance for auth
// use prefix 'auth' to represent that this router deal with auth bussiness
const router = new Router({
  prefix: '/auth',
})

// call the cb fn when /auth/register made a POST request
router.post('/register', async (ctx) => {
  // get req data from post req
  const { account, password, inviteCode } = getBody(ctx)

  console.log(inviteCode)

  // check account and password in the back-end to prevent invalid post
  // that are not send from the front-end
  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: 'Account and password is empty!',
      data: null,
    }
    return
  } else if (account.length < 3) {
    ctx.body = {
      code: 0,
      msg: 'Account must have more than 3 cahracters!',
      data: null,
    }
    return
  } else if (password.length < 3) {
    ctx.body = {
      code: 0,
      msg: 'Password must have more than 3 cahracters!',
      data: null,
    }
    return
  } else if (inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: 'Invite code is empty!',
      data: null,
    }
    return
  }

  // check if this account is already in the 'User' model
  const findUser = await User.findOne({
    account,
  }).exec()
  // if invalid
  if (findUser) {
    ctx.body = {
      code: 0,
      msg: 'Account already existed',
      data: null,
    }
    return
  }

  // check if invite code is valid
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec()
  // if invite code is invalid or is already occupied
  if (!findCode || findCode.user) {
    ctx.body = {
      code: 0,
      msg: 'Invite code is invalid!',
      data: null,
    }
    console.log(findCode)
    return
  }

  // create a new user
  const user = new User({
    account,
    password,
  })

  // save the new user to DB & get response data
  const res = await user.save()

  // deliver invite code to this user by id
  findCode.user = res._id
  findCode.meta.updateAt = new Date().getTime() // update timestp

  // sane the new invite code to DB
  await findCode.save()

  ctx.body = {
    code: 1,
    msg: 'successfully registered',
    data: res,
  }
})

router.post('/login', async (ctx) => {
  const { account, password } = getBody(ctx)

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: 'Account and password is empty!',
      data: null,
    }
    return
  }

  // check if the account exist
  const findUser = await User.findOne({
    account,
  }).exec()

  // account don't exist
  if (!findUser) {
    ctx.body = {
      code: 0,
      msg: 'Account or passsword is incorrect!',
      data: null,
    }
    return
  }

  // create a new userRes as respose data to hide the password
  const userRes = {
    account: findUser.account,
    _id: findUser._id,
  }

  // check the password
  if (findUser.password === password) {
    ctx.body = {
      code: 1,
      msg: 'successfully login',
      data: {
        userRes,
        // sign jwt token
        token: jwt.sign(
          // payload have to be a obj
          {
            account: userRes.account,
            _id: userRes._id,
          },
          'book'
        ),
      },
    }
    return
  }

  ctx.body = {
    code: 0,
    msg: 'Account or passsword is incorrect!',
    data: null,
  }
})

module.exports = router
