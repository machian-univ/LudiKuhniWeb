'use strict'

const innerController =  require('./controllers/indexController')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController.js')

const { check } = require('express-validator');
const { body } = require('express-validator');

module.exports = (app, passport) => {
      
    app
        .route('/')
        .get(innerController.getMainPage)

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

var SignUpValidate = [
    body('username')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('name')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('password')
        .escape(), 
    check('username', 'Некорректный Email.')
        .isEmail(),
    check('name')
        .isLength({ min: 3 }).withMessage("Имя должно содержать минимум 3 символа."),
    check('password')
        .isLength({ min: 6 }).withMessage('Пароль должен содеражать миниммум 6 символов.')
        .isLength({ max: 20 }).withMessage('Пароль должен содеражать максимум 20 символов.')
        .matches('[0-9]').withMessage('Пароль должен содержать минимум одну цифру.')
        .matches('[a-zA-Z]').withMessage('Пароль должен содержать минимум одну латинскую букву.')
        .isAlphanumeric().withMessage('Пароль должен состоять из цифр и латиских букв.')
    ]

var SignInValidate = [
    body('username')
        .escape()
        .ltrim(' ')
        .rtrim(' '),
    body('password')
        .escape(), 
    check('username')
        .isEmail(),
    check('password')
        .isLength({ min: 6, max: 20 })
        .matches('[0-9]')
        .matches('[a-zA-Z]')
        .isAlphanumeric()
];

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/signin');
}

function LogOut(req, res) {
    req.logout();
    res.redirect('/');
}