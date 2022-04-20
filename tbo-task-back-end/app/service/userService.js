import bcrypt from 'bcrypt';

import CONSTANTS from '../../config/constants';
import globalFunction from '../../config/globalFunction';
let resultdb = globalFunction.resultdb;



let createUser = async (userData) => {
	const conn = await connConfig.getConnection();
	try {
		await conn.beginTransaction();
		

		let createdUserData = await conn.query('INSERT INTO users SET ?', [userData]);
			await conn.commit();
			conn.release();
			return resultdb(CONSTANTS.SUCCESS, createdUserData);
		
	} catch (error) {
        console.log(error)
		await conn.rollback(); conn.release();
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};



let userLogin = async (data) => {
	try {
		let userData = await getUserByEmail(data.email);
		console.log("userData",userData)
		if (userData.statusCode === CONSTANTS.SUCCESS) {
				let isValidPassword = bcrypt.compareSync(data.password, userData.data.password);
				console.log("isValidPassword",isValidPassword)
				if (isValidPassword) {
				
					return resultdb(CONSTANTS.SUCCESS, userData);
				} else
					return resultdb(CONSTANTS.ACCESS_DENIED);
			
		} else if (userData.statusCode == CONSTANTS.NOT_FOUND)
			return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL);
		else
			return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};



let getUserToDoByUserId = async (user_id) => {
	try {
        console.log(user_id)
		let toDoList = await MysqlPool.query('SELECT * FROM to_do_task where user_id = ?', user_id);
		
			return resultdb(CONSTANTS.SUCCESS, toDoList);
		
	} catch (error) {
		return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
	}
};


module.exports = {
	createUser,userLogin,getUserToDoByUserId 
};