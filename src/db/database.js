const Sequelize = require('sequelize')

/**
 * THIS IS FOR DEVELOPMENT
 * UN-COMMENT THIS DURING DEVELOPING ON LOCAL
 */
//  const db = new Sequelize('db', 'founder', 'ksksrrpj01@', {
// 	host: 'localhost',
// 	dialect: 'mysql',
//  });

/**
 * THIS IS THE PRODUCTION DATABASE
 */

const db = new Sequelize('heroku_42d990be20d6c89', 'b6419cb2460fc8', '85937b9d', {
	host: "us-cdbr-east-05.cleardb.net",
	dialect: 'mysql',
	port: 3306,
});



module.exports = {
	db
};
