'use strict'

const db = require('../settings/db')
const config = require('../settings/config')
const { render } = require('pug')

exports.getSignupPage = (req, res) => {

    res.render('../Views/pug/registration', { message: req.flash('signupMessage') })
}

exports.getSigninPage = (req, res) => {

    res.render('../Views/pug/sign-in', { message: req.flash('signinMessage') })
}