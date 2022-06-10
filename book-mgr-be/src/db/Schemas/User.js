const mongoose = require('mongoose')
const { getMeta } = require('../helper')

// create a schema for user
const UserSchema = new mongoose.Schema({
  account: String,
  password: String,

  // get date
  meta: getMeta(),
})

// register UserSchema as model 'User'
mongoose.model('User', UserSchema)
