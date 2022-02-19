'use strict'

const conn = require('../../connection.js')
const response = require('../../response')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = (req, res) => {

	//Get username and password
	const username = req.body.username
	const password = req.body.password

	//If admin want to login using path /login/admin
	const { originalUrl } = req
	const role = originalUrl === '/admin/login' ? 'master' : 'general'
	
	//Validation data using mySQL
	let sql = `SELECT username, role FROM Accounts WHERE username = '${username}' AND password = '${password}' AND role = '${role}'` 

	conn.query(sql, (err, rows) => {
		if ( err ) response.internalError(res, err)
		else {
			if ( rows.length > 0 ) {
				//create isAdmin ?
				const isAdmin = rows[0].role === 'master' ? true : false 
				
				//Create new JWT token
				const token = jwt.sign(
					{ username, isAdmin },
					process.env.JWT_SECRET_KEY,
					{ expiresIn: '30m' }
				)

				//save token to DB
				sql = `UPDATE Accounts SET token = '${token}' WHERE username = '${username}' AND password = '${password}'`	
				
				conn.query(sql, err => {
					if (err) response.internalError(res, err)
				})

				//Send token to client
				response.success(res, { token })
			}
			else response.forbidden(res)
		}
	})
}
