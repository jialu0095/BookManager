import axios from 'axios'

// make a post to back-end
export const register = (account, password, inviteCode_code) => {
  // return a promise
  return axios.post('http://localhost:3000/auth/register', {
    account,
    password,
    inviteCode_code,
  })
}

export const login = (account, password) => {
  return axios.post('http://localhost:3000/auth/login', {
    account,
    password,
  })
}
