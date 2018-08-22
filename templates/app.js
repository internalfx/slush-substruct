let substruct = require('substruct')

substruct.configure()

substruct.start().then(async function ({koa, config}) {
  console.log('Server Started...')
}).catch(function (err) {
  console.error(err.stack)
})
