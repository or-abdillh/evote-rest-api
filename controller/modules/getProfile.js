'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get username profile
	const username = req.params.username

	const sql = `SELECT Accounts.fullname, Accounts.status_vote, Accounts.gender, Jobs.job_name 
	    FROM Accounts INNER JOIN Jobs ON Accounts.job_id = Jobs.job_id AND Accounts.username = "${username}"`
	    
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
