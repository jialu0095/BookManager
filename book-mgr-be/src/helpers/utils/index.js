// for routers to get req datas
const getBody = (ctx) => {
  return ctx.request.body || {}
}

module.exports = {
  getBody,
}
