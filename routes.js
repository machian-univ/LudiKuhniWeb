'use strict'

module.exports = (app, passport) => {
    
    const innerController =  require('./controllers/indexController')
    const authController = require('./controllers/authController')
    const userController = require('./controllers/userController.js')
    
    app
        .route('/')
        .get(innerController.getMainPage)

    app
        .route('/signup')
        .get(authController.getSignupPage)

    app
        .route('/signup')
        .post(passport.authenticate('local-signup', {
            successRedirect : '/home', 
            failureRedirect : '/signup', 
            failureFlash : true 
        }))

    app
        .route('/signin')
        .get(authController.getSigninPage)

    app
        .route('/signin')
        .post(passport.authenticate('local-login', {
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