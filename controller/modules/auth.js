'use strict'

const jwt = require('jsonwebtoken')
const conn = require('../../connection.js')
const response = require('../../response')

require('dotenv').config()

module.exports = (req, res) => {

	//Get token
	const token = req.headers.authorization

	//Decode
	jwt.verify(
		token, 
		process.env.JWT_SECRET_KEY,
		(err, decoded) => {
			if (err) response.forbidden(res, err.name)
		 	else {
			//Verify username and token
			const sql = `SELECT username FROM Accounts WHERE username = '${decoded.username}' AND token = '${token}'`
			
			conn.query(sql, (err, rows) => {
				if (err) response.internalError(res, err) 
				else {
					if (rows.length > 0) response.success(res, 'Your account verified') //Verified
					else response.forbidden(res, 'Ilegal access !!')
				}
			})
		}
	})
}
