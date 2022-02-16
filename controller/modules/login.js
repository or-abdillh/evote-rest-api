'use strict'

const conn = require('../../connection.js')
const response = require('../../response')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res) => {

	//Get username and password
	const username = req.body.username
	const password = req.body.password

	//Validation dat suing mySQL
	const sql = `SELECT username, role FROM Accounts WHERE username = '${username}' AND password = '${password}' AND role = 'general'` 

	conn.query(sql, (err, rows) => {
		if ( err ) response.internalError(res, err)
		else {
			if ( rows.length > 0 ) {
				//Create new JWT token
				const token = jwt.sign(
					{ username, role: rows[0].role },
					process.env.JWT_SECRET_KEY,
					{ expiresIn: process.env.JWT_TOKEN_EXPIRED }
				)

				//Send token to client
				response.success(res, { token })
			}
			else response.forbidden(res)
		}
	})
}
