// import mongoose
const mongoose = require('mongoose')
require('./Schemas/User') // excute User.js to register 'User' model

// const UserModal = mongoose.model('User', UserSchema)

// define function for connecting DB
const connect = async () => {
  // only when the db is connected will the port be listened and accept requests
  return new Promise((resolve) => {
    // mongoose methods，local DB port: 27017
    mongoose.connect('mongodb://127.0.0.1:27017/book')

    // listen for the event "open DB"
    mongoose.connection.on('open', () => {
      console.log('connected successfully')
      resolve()
    })
  })
}

module.exports = {
  connect,
}
