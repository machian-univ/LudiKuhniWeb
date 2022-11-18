// config passport.js
var LocalStrategy   = require('passport-local').Strategy;

const db = require('../settings/db');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id, user.role);
    });

    passport.deserializeUser(async function(id, done) {
        const selectSQL = "SELECT * FROM users WHERE id = ?"
        let err, result = await db.awaitQuery(selectSQL, [id])
            done(err, result[0])
    })

    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        async function(req, username, password, done) {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return done(null, false, req.flash('signupErrors', errors.array()))
              }

            const selectSQL = "SELECT * FROM users WHERE email = ?"
            let result = await db.awaitQuery(selectSQL, [username])
            if (result.length) {

                return done(null, false, req.flash('signupMessage', 'Пользователь с таким email уже существует.'));
            } else {

                const salt = bcrypt.genSaltSync(10);
                const hashedPassport = bcrypt.hashSync(password, salt) 

                var newUser = {
                    id: undefined,
                    name: req.body.name,
                    email: username,
                    password: hashedPassport
                };

                const insertSQL = "INSERT INTO users(name, email, password`) VALUES(?, ?, ?)"
                let result = await db.awaitQuery(insertSQL, [newUser.name, newUser.email, newUser.password])

                newUser.id = result.insertId
                return done(null, newUser)
            }
        })
    )


    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        async function(req, username, password, done) { 
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return done(null, false, req.flash('signinErrors', errors.array()))
              }

            let result = await db.awaitQuery("SELECT * FROM users WHERE email = ?", [username])
            if (!result.length) {

                return done(null, false, req.flash('signinMessage', 'Неверный email или пароль!'))
            }
            if (!bcrypt.compareSync(password, result[0].password)){

                return done(null, false, req.flash('signinMessage', 'Неверный email или пароль!'))
            }
            
            var user = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                password: result[0].passport,
            }

            return done(null, user)
        })
    )
}
