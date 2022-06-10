import axios from 'axios'

// make a post to back-end
export const register = (account, password) => {
  axios.post('http://localhost:3000/auth/register', {
    account,
    password,
  })
}

export const login = (account, password) => {
  axios.post('http://localhost:3000/auth/login', {
    account,
    password,
  })
}