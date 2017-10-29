
  // General Configuration
  //
  // options in this file are overidden by keys in environment specific files. e.g. dev.js or prod.js

module.exports = {
  middleware: [
    'performance',
    'body',
    'httpError',
    'session',
    'router'
  ],
  port: 8000,
  rootUrl: null, // optional, e.g. rootUrl: http://your-host-name.com-as-accessed-from-internet:3000
  secret: '<%= secretKey %>',
  session: {
    sessionCookieName: 'x-substruct-token',
    sessionCookieMaxAge: 1000 * 60 * 60 * 24 * 365,
    load: function (token) {
      return null
    },
    save: function (token, data) {
      return null
    }
  },
  templateEngine: 'ejs'
}
