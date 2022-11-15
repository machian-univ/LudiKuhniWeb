'use strict'

const indexController =  require('./controllers/indexController')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController.js')
const { SignUpValidate, SignInValidate } = require('./settings/validator_config')


module.exports = (app, passport) => {
      
    app
        .route('/')
        .get(indexController.getMainPage)

    app
        .route('/signup')
        .get(authController.getSignupPage)

    app
        .route('/signup')
        .post(SignUpValidate, passport.authenticate('local-signup', {
            successRedirect : '/home', 
            failureRedirect : '/signup', 
            failureFlash : true 
        }))

    app
        .route('/signin')
        .get(authController.getSigninPage)

    app
        .route('/signin')
        .post(SignInValidate, passport.authenticate('local-login', {
            successRedirect : '/home', 
            failureRedirect : '/signin', 
            failureFlash : true 
		}))
    
    app
        .route('/home')
        .get(isLoggedIn, userController.getHomePage)

    app
        .route('/logout')
        .get(LogOut)
}


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/signin');
}

function LogOut(req, res) {
    req.logout();
    res.redirect('/');
}