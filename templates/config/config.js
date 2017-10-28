
  // General Configuration
  //
  // options in this file are overidden by keys in environment specific files. e.g. dev.js or prod.js

module.exports = {
  rootUrl: null, // optional, e.g. rootUrl: http://your-host-name.com-as-accessed-from-internet:3000
  port: 8000,
  secret: '<%= secretKey %>',
  mailer: {
    // Nodemailer Config
    // host: '',
    // auth: {
    //   user: '',
    //   pass: ''
    // }
  },
  middleware: [
    'performance',
    'body',
    'httpError',
    'session',
    'router'
  ]
}
