// var jwt = require('jsonwebtoken')

module.exports = async function (ctx) {
  if (false) { // Check if user is logged in somehow
    ctx.throw(403) // Throw error if false
    return
  }

  return true // Allow controller method to execute.
}
