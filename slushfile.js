/*
 * slush-substruct
 * https://github.com/internalfx/slush-substruct
 *
 * Copyright (c) 2017, Bryan Morris
 * Licensed under the MIT license.
 */

'use strict'

const gulp = require('gulp')
const yarn = require('gulp-yarn')
const conflict = require('gulp-conflict')
const template = require('gulp-template')
const rename = require('gulp-rename')
const _ = require('underscore.string')
const inquirer = require('inquirer')
const path = require('path')
const crypto = require('crypto')

function format (string) {
  var username = string.toLowerCase()
  return username.replace(/\s/g, '')
}

const uniqueId = function (length) {
  let chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let bytes = crypto.randomBytes(length)
  let value = []

  for (let i = 0; i < length; i += 1) {
    value.push(chars[bytes[i] % chars.length])
  }

  return value.join('')
}

var defaults = (function () {
  var workingDirName = path.basename(process.cwd())
  let homeDir
  let osUserName
  let configFile
  let user

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase()
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH
    osUserName = (homeDir && homeDir.split('/').pop()) || 'root'
  }

  configFile = path.join(homeDir, '.gitconfig')
  user = {}

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user
  }

  return {
    appName: workingDirName,
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || ''
  }
})()

gulp.task('default', function (done) {
  var prompts = [{
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }]
  // Ask
  inquirer
    .prompt(prompts)
    .then(function (answers) {
      answers.appNameSlug = _.slugify(answers.appName)
      answers.secretKey = uniqueId(40)

      gulp.src(path.join(__dirname, 'templates', '**'), {dot: true})
        .pipe(template(answers, {interpolate: /<%=([\s\S]+?)%>/g}))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1)
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(yarn())
        .on('end', function () {
          done()
        })
    })
})
