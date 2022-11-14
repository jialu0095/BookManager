import axios from 'axios'

// add new book
export const add = (form) => {
  return axios.post('http://localhost:3000/book/add', form)
}

// get book list
export const list = (data) => {
  return axios.get('http://localhost:3000/book/list', {
    params: data,
  })
}

// delete book
export const remove = (id) => {
  return axios.delete(`http://localhost:3000/book/${id}`)
}

// update count
export const updateCount = (data) => {
  return axios.post('http://localhost:3000/book/update/count', data)
}

// update book detail msg
export const update = (data) => {
  return axios.post('http://localhost:3000/book/update', data)
}
