'use strict'

const response = require('../response')
const conn = require('../connection.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res, next) => {

	//Get token 
	const token = req.headers.authorization

	//Authentication user
	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

		if (err) response.forbidden(res, err.name)
		else {
			console.log(decoded)
			//Get username an verified to DB
			const username = decoded.username
			const sql = `SELECT username FROM Accounts WHERE username = '${username}' AND token = '${token}'`

			conn.query(sql, (err, rows) => {

				if (err) response.internalError(res)
				else {
					if ( rows.length > 0 ) next() //Verified 
					else response.forbidden(res)
				}
			})
			
		}
	})
}
