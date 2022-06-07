// import mongoose
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  age: Number,
})

const UserModal = mongoose.model('User', UserSchema)

// define function for connecting DB
const connect = () => {
  // mongoose methods，local DB port: 27017
  mongoose.connect('mongodb://127.0.0.1:27017')

  // listen for the event "open DB"
  mongoose.connection.on('open', () => {
    console.log('connected successfully')
  })

  // create a UserModal instance
  const user = new UserModal({
    name: 'Tomas',
    password: 'Shellby',
    age: '35',
  })

  // save the info into user & sycronize the info
  user.save()
}

connect()
