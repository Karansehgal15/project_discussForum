const express = require('express')
	, router = express.Router()
	, {createUserLocal, findUserByParams} = require('../controllers/user')
	, {pass2hash} = require('../utils/passwordUtils')
	, passport = require('passport')
	, db = require('../db/db');

router.get('/', (req, res) => {
	res.redirect('/login.html')
})

router.post('/', async (req, res) => {
	try {
		const user = await findUserByParams({email: req.body.email});
		if(user != undefined) {
			console.log("User with this e-mail already exists!!!");
		}
		else {
			const passhash = await pass2hash(req.body.password);
			const createdUser = await createUserLocal({
				email: req.body.email,
				password: passhash,
				firstName: req.body.fn,
				lastName: req.body.ln,
				dob: req.body.dob,
				gender: req.body.gen
			});
			if(createdUser == undefined) {
				console.log("Could not create user. Please try again!!!");
			}
			else {
				console.log("TRYING TO LOG USER IN");
				// Login after signup automatically
				passport.authenticate('local', {
					failureRedirect: '/signup'
				}, (req, res) => {
					console.log("hey login done!!!");
					res.status(200).send(createdUser);
				})
			}
		}
	}
	catch (err) {
		console.log("Error in signup.");
	}
})

module.exports = router;
