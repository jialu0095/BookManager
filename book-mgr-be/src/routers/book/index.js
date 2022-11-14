const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

const BOOK_CONST = {
  ADD: 1,
  MINUS: 2,
}

const Book = new mongoose.model('Book') // an instance for model 'User'

// create a Router instance for book
const router = new Router({
  prefix: '/book',
})

router.post('/add', async (ctx) => {
  const { name, price, author, publishDate, classify, count } = ctx.request.body

  const book = new Book({
    name,
    price,
    author,
    publishDate,
    classify,
    count,
  })

  // get response data
  const res = await book.save()

  ctx.body = {
    code: 1,
    msg: 'Add new book successfully!',
    data: res,
  }
})

router.get('/list', async (ctx) => {
  // url: http://aa.cc.com/list?page=2&size=20&keyword=书名#others
  // get query from ctxbody: page=2&size=20
  const { page = 1, keyword = '' } = ctx.query

  let { size = 10 } = ctx.query

  // define a query to carry keyword
  // query won't carry any name if keyword is null
  const query = {}
  if (keyword) {
    query.name = keyword
  }

  const list = await Book.find(query)
    .skip((page - 1) * size) // skip the first few pages
    .limit(size)
    .exec()

  // get the number of files in Book set DB
  const total = await Book.countDocuments()

  ctx.body = {
    code: 1,
    msg: 'Get list successfully!',
    data: {
      total,
      page,
      size,
      list,
    },
  }
})

router.delete('/:id', async (ctx) => {
  // get is from front-end
  const { id } = ctx.params

  // delete files in the DB
  const delMsg = await Book.deleteOne({
    _id: id,
  })

  ctx.body = {
    data: delMsg,
    msg: 'Delete successfully!',
    code: 1,
  }
})

router.post('/update/count', async (ctx) => {
  // type: in or out book
  const { id, count, type, editCount } = ctx.request.body
  const book = await Book.findOne({
    _id: id,
  }).exec()
  if (!book) {
    ctx.body = {
      code: 0,
      msg: 'No book found.',
    }
    return
  }
  // add one book
  if (type === BOOK_CONST.ADD) {
    book.count = book.count + editCount
  }
  // minus one book
  else {
    book.count = book.count - editCount
  }
  // check for lower bound of book count
  if (book.count < 0) {
    book.count = 0
  }
  // tell mongoose to save to mongo
  const res = await book.save()
  // response context
  ctx.body = {
    code: 1,
    msg: 'complete.',
    data: res,
  }
})

// update a book's detail message
router.post('/update', async (ctx) => {
  // remain parameters "..."
  const { id, ...others } = ctx.request.body

  const book = await Book.findOne({
    _id: id,
  }).exec()

  if (!book) {
    ctx.body = {
      code: 0,
      msg: 'No book found.',
    }
    return
  }

  const newQuery = {}
  // Object.entries traverse dictionary
  Object.entries(others).forEach(([key, value]) => {
    if (value) {
      newQuery[key] = value
    }
  })
  Object.assign(book, newQuery)

  const res = await book.save()

  ctx.body = {
    data: res,
    code: 1,
    msg: 'Change saved!',
  }
})

module.exports = router
