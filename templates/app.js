let substruct = require('substruct')

substruct.init().then(async function ({koa, config}) {
  let server = require('http').createServer(koa.callback())

  server.listen(config.port)
  console.log('Server Started...')
}).catch(function (err) {
  console.error(err.stack)
})
