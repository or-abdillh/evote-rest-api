'use strict'

//Middleware for validation admin access
const response = require('../response')
const conn = require('../connection.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = ( req, res, next ) => {

	//Verify token
	const token = req.headers.authorization

	jwt.verify(
		token, 
		process.env.JWT_SECRET_KEY,
		(err, decoded) => {
			if (err) response.forbidden(res, err.name)
			else {
				if ( decoded.isAdmin ) next()
				else response.forbidden(res, 'Just admin can access this resource !!')
			}
		}
	)
}
