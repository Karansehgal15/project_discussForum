const sequelize = require('sequelize')

/**
 * THIS IS FOR DEVELOPMENT
 * UN-COMMENT THIS DURING DEVELOPING ON LOCAL
 */
// module.exports = new sequelize('db', 'founder', 'ksksrrpj01@', {
// 	host: 'localhost',
// 	dialect: 'mysql',
// });


/**
 * THIS IS THE PRODUCTION DATABASE
 */
module.exports = new sequelize('heroku_42d990be20d6c89', 'b6419cb2460fc8', '85937b9d', {
	host: 'us-cdbr-east-05.cleardb.net',
	port: 3306,
	dialect: 'mysql',
});
