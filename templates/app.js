let Substruct = require('substruct')

let substruct = Substruct()

substruct.init().catch(function (err) {
  console.error(err.stack)
})
