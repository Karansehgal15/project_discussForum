const express = require('express')
	, signupRoute = require('./src/routers/signup')
	, homeRoute = require('./src/routers/home')
	, userRoutes = require('./src/routers/users')
	, passport = require('passport')
	, path = require('path')
	, passUtils = require('./src/utils/passwordUtils')
	, LocalStrategy = require('passport-local').Strategy;

const app = express()
app.use(express.static(path.join(__dirname, './src/public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

passport.use(new LocalStrategy(
	function(username, password, done) {
	findUserByParams({email: username})
		.then(user => {
			console.log("user is user")
			if(user == undefined) {
				console.log("ERROR: NO USER WITH THIS USERNAME EXISTS!!!");
				return done(null, false);
			}
			else {
				passUtils.compare2hash(password, user.password).then(match => {
					if(match) {
						console.log("authenticated in local strategy");
						return done(null, user);
					}
					else {
						console.log("Could not authenticate in local strategy");
						return done(null, false);
					}
				})
			}
		})
		.catch(err => console.log(err))
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/signup', signupRoute);
app.use('/',homeRoute);
app.use('/users', userRoutes);

// TEST DB
const db = require('./src/db/database')
db.authenticate()
.then(() => {console.log("Database Connected.")})
.catch(err => console.log("Error in DB connection: ", err));

//activation of port
const PORT = process.env.PORT || 2121;
app.listen(PORT, console.log(`Server started on port ${PORT}`))
