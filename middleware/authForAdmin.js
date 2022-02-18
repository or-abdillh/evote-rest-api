'use strict'

//Middleware for validation admin access
const response = require('../response')
const conn = require('../connection.js')
const jwt = require('jsonwebtoken')

require('dotenv').config()

module.exports = ( req, res, next ) => {

	//Decoode token
	const decoded = jwt.decode( req.headers.authorization, { complete: true } )

	if ( decoded.payload.isAdmin ) next()
	else response.forbidden(res, 'Just admin can access this resource !!')
}
