import { message } from 'ant-design-vue'

//deal post and return result message
export const result = (res, authShowErr = true) => {
  const { data } = res

  // hint err when get code 0
  if (!data.code && authShowErr) {
    message.error(data.msg)
  }

  // return a obj made of call back fns
  return {
    success(cb) {
      if (data.code) {
        cb(data, res)
      }
      return this
    },
    fail(cb) {
      if (!data.code) {
        cb(data, res)
      }
      return this
    },
    finally(cb) {
      cb(data, res)
      return this
    },
  }
}

// clone an obj
export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// transfer timestp to date
export const formatTsp = (tsp) => {
  const date = new Date(Number(tsp))

  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()

  // const hh = tspPadStart(date.getHours())
  // const mm = tspPadStart(date.getMinutes())
  // const ss = tspPadStart(date.getSeconds())

  return `${YYYY}-${MM}-${DD}`
}
