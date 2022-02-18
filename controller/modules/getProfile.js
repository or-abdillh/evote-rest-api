'use strict'

const response = require('../../response')
const conn = require('../../connection.js')
const jwt = require('jsonwebtoken')

module.exports = ( req, res ) => {

	//Get username from token
	const token = req.headers.authorization
	const decoded = jwt.decode(token, { complete: true })
	
	const sql = `SELECT Accounts.fullname, Accounts.status_vote, Accounts.gender, Jobs.job_name 
	    FROM Accounts INNER JOIN Jobs ON Accounts.job_id = Jobs.job_id AND Accounts.username = "${decoded.payload.username}"`
	    
  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err.sqlMessage)
  	else {
  		if (rows.length <= 0) response.notFound(res, { username }) 
  		else {
  			response.success(res, { profile: rows[0] })
  		}
  	}
  }) 	
}
