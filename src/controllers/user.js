db = require('../db/db');

async function createUserLocal(query) {
    try {
       	const userLocal = await db.user.create({
			email: query.email,
			password: query.password,
			firstName:query.firstName,
			lastName: query.lastName,
			dob: query.dob,
			gender: query.gender
		})
		return userLocal;
    } catch (err) {
		console.log("error while creating user");
		return undefined;
	}
}

async function findUserById(uid) {
	try {
		const resp = await db.user.findOne({
			where: { uid }
		});
		return resp;
	}
	catch(err) {
		console.log("there is error in findUserById");
		return undefined;
	}
}

async function findUserByParams(params) {
	try {
		const resp = await db.user.findOne({
			where:  {email: params.email}
		})
		console.log("user found!!!!!");
		return resp;
	}
	catch(err) {
		console.log("user not found!!!!!!");
		console.log(err);
		return undefined;
	}
}


module.exports = {
	createUserLocal,
	findUserById,
	findUserByParams
}
