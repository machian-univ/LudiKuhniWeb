const express = require('express')
const app = express()
const host = '127.0.0.1', port = 3000

const bodyParser = require('body-parser')

var cookieParser = require('cookie-parser');
const passport = require('passport')
var session = require('express-session');
var flash = require('connect-flash');

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

app.use(express.static( __dirname + '/views'));
app.set('view engine', 'pug'); // set up ejs for templating

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(cookieParser());
app.use(passport.initialize())
app.use(passport.session());
app.use(flash());


const routes = require('./routes')
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.listen(3000, () => {
    console.log(`Server listens http://${host}:${port}`)
})