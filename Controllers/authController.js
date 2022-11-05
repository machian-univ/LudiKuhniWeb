'use strict'

const db = require('../settings/db')
const config = require('../settings/config')

exports.getSignupPage = (req, res) => {
    res.render(__dirname +'/Views/signupPage.ejs', { message: req.flash('signupMessage') })
}

exports.getSigninPage = (req, res) => {
    res.render(__dirname + '/Views/signinPage.ejs', { message: req.flash('signinMessage') })
}