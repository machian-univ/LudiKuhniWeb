'use strict'

const db = require('../settings/db')
const config = require('../settings/config')
const { render } = require('pug')

exports.getSignupPage = (req, res) => {
    // res.render(__dirname +'/Views/signupPage.ejs', { message: req.flash('signupMessage') })


    res.render('../Views/pug/registration')

}

exports.getSigninPage = (req, res) => {
    // res.render(__dirname + '/Views/signinPage.ejs', { message: req.flash('signinMessage') })





    res.render('../Views/pug/sign-in')

}