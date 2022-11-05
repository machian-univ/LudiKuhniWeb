// config/passport.js
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt');

const db = require('../settings/db');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        const sql = "SELECT * FROM `users` WHERE `id` = '" + id + "'"
        db.query(sql, function(err, rows){
            done(err, rows[0]);
        });
    });


    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            const sql = "SELECT `email` FROM `users` WHERE `email` = '" + email + "'"
            db.query(sql, function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // if there is no user with that username
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassport = bcrypt.hashSync(password, salt) 
                    // create the user
                    var newUser = {
                        id: undefined,
                        name: req.body.name,
                        email: email,
                        password: hashedPassport
                    };

                    const sql = "INSERT INTO `users`(`name`, `email`, `password`) VALUES('" + newUser.name + "', '" + newUser.email + "', '" + newUser.password + "')";
                    db.query(sql,function(err, rows) {
                        newUser.id = rows.insertId
                        return done(null, newUser);
                    });
                }
            });
        })
    );


    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            db.query("SELECT * FROM users WHERE email = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('signinMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('signinMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};




































// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const db = require('./db')
// const config = require('./config')

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.jwt
// }

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy(options, (payload, done) => {
//             try {
//                 db.query("SELECT `id`, `email` FROM `users` WHERE `id` = '" + payload.userId + "'", (error, rows, fields) => {
//                     if(error) {
//                         console.log(error)
//                     } else {
//                         const user = rows
//                         if(user) {
//                             done(null, user)
//                         } else {
//                             done(null, false)
//                         }
//                     }
//                 })
//             } catch(e) {
//                 console.log(e);
//             }
//         })
//     )
// }