const express = require('express')
	, router = express.Router()
	, db = require('../db/db')
	, Sequelize = require('sequelize');

router.get('/', (req, res) => {
	db.user.findAll()
	.then(users => {
		console.log("users => ", users);
		res.send(users);
		res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
	})
})


module.exports = router;
