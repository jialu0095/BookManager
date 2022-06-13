const mongoose = require('mongoose')
const { getMeta } = require('../helper')

// create a schema for user
const InviteCodeSchema = new mongoose.Schema({
  code: String, // Invite code
  user: String, // Used for whom

  // get date
  meta: getMeta(),
})

// register UserSchema as model 'InviteCode'
mongoose.model('InviteCode', InviteCodeSchema)
