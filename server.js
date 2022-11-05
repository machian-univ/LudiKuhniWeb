const express = require('express')
const app = express()
const host = '127.0.0.1', port = 3000

const bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');
const passport = require('passport')
var session  = require('express-session');
var flash    = require('connect-flash');

require('./settings/passport_config')(passport)

// required for passport
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 10 * 60 * 1000,
		httpOnly: false,
	  }
 } )); // session secret

app.set('view engine', 'ejs'); // set up ejs for templating

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(passport.initialize())
app.use(cookieParser()); // read cookies (needed for auth
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


const routes = require('./routes')

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport






app.listen(3000, () => {
    console.log(`Server listens http://${host}:${port}`)
})