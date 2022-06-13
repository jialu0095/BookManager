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
