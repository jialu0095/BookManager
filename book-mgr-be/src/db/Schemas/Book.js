const mongoose = require('mongoose')
const { getMeta } = require('../helper')

// create a schema for books
const BookSchema = new mongoose.Schema({
  name: String,
  price: Number,
  author: String,
  publishDate: String,
  classify: String,
  count: Number,

  // get date
  meta: getMeta(),
})

// register BookSchema as model 'Book'
mongoose.model('Book', BookSchema)
