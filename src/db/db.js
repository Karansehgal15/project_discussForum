//commands to use  from commandline  after mysql installation  before running this file
//command to start mysql -> mysql -u root -p
//first create db from using this line ->create database db;
//check created db available or not ->show databases;
//then create user by this line -> create user "founder" identified by "ksksrrpj01@";
//check created user available or not ->select user from mysql.user;
//then provide priviledges to founder by this command-> GRANT ALL ON db.* TO 'founder';
//command to revoke priviledges revoke all on db from 'founder';
//to provide,see and remove priviledges on complete sql
//grant all on *.* to 'founder';
//show grants for 'founder';
//revoke all on *.* from 'founder';
const sequelize = require('sequelize')
const {db} = require('./database')


const User = db.define('User', {
	uid: {
		type: sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true
	},
	password:  {
		type: sequelize.DataTypes.STRING,
		unique: true,
		allowNull: false
	},
	avatar: {
		type: sequelize.DataTypes.STRING,
		allowNull: true
	},
	firstName: {
		type: sequelize.DataTypes.STRING
	},
	lastName: {
		type: sequelize.DataTypes.STRING
	},
	email: {
		type: sequelize.DataTypes.STRING
	},
	dob: {
		type: sequelize.DataTypes.STRING
	},
	gender: {
		type: sequelize.DataTypes.STRING(1)
	},
	state: {
		type: sequelize.DataTypes.STRING
	},
	city: {
		type: sequelize.DataTypes.STRING
	},
	bio: {
		type: sequelize.DataTypes.STRING
	},
	zip: {
		type: sequelize.DataTypes.STRING
	},
	hobbies: {
		type: sequelize.DataTypes.STRING
	},
	mobile_number: {
		type: sequelize.DataTypes.STRING
	},
	schDet:{
		type: sequelize.DataTypes.STRING
	},
	colDet:{
		type: sequelize.DataTypes.STRING
	},
	faceDet:{
		type: sequelize.DataTypes.STRING
	},
	linkDet:{
		type: sequelize.DataTypes.STRING
	},
	instaDet:{
		type: sequelize.DataTypes.STRING
	},
	empDet:{
		type: sequelize.DataTypes.STRING
	},
	ilink:{
		type: sequelize.DataTypes.STRING
	},
	cid:{
		type: sequelize.DataTypes.STRING	// CHANGED FROM JSON
	}
}, {
	timestamps: false
});

const cards = db.define('carddets',{
	cid:{
		type:sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement:true
	},
	uid:{
		type:sequelize.DataTypes.STRING(6)
	},
	keywords: {
		type: sequelize.DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: sequelize.DataTypes.STRING,
		allowNull:false
	},
	likes:{
		type:sequelize.DataTypes.STRING,	// CHANGED FROM JSON
		allowNull:true
	},
	lastMsg: {
		type: sequelize.DataTypes.BIGINT,
		allowNull: true
	}
}, {
	timestamps: false
});

const messages = db.define('messages', {
	mid: {
		type:sequelize.DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement:true
	},
	cid:{
		type:sequelize.DataTypes.BIGINT,
	},
	message: {
		type: sequelize.DataTypes.STRING,
 		allowNull:true
	},
	author: {
		type: sequelize.DataTypes.STRING,
 		allowNull:false
	},
	uid:{
		type:sequelize.DataTypes.STRING,
		allowNull:false
	}
}, {
	timestamps: false
})


db.sync().then(() => console.log("Database has been synced")).catch((err) => console.error("Error creating database"));
db.authenticate().then(() => {console.log("Database Connected.")}).catch(err => console.log("Error in DB connection: ", err));

module.exports = {
	User, cards,messages
}




















// const auth=db.define('authdets',{
//     eid: {type:sequelize.STRING,  primaryKey: true  },
//     uid: {type:sequelize.STRING,  allowNull:false},
//     pass:  {type:sequelize.STRING, allowNull:false}
// })
// const entry=db.define('counts',{
//     id: {type:sequelize.INTEGER,    autoIncrement: true,  primaryKey: true  },
//     usercount:{type:sequelize.INTEGER, allowNull:false},
//     cardcount:{type:sequelize.INTEGER, allowNull:false}
// })
