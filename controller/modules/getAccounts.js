'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = (req, res  ) => {

	//Get all Accounts fields with join to table Jobs
	const sql = `
     SELECT Accounts.fullname, Accounts.username, Accounts.password, 
     Jobs.job_name, Accounts.gender, Accounts.status_vote, Accounts.time_stamp, 
     Accounts.last_modified FROM Accounts INNER JOIN Jobs ON 
     ( Accounts.job_id = Jobs.job_id AND Accounts.role = "general" ) 
     ORDER BY Accounts.fullname ASC
  `

  conn.query(sql, (err, accounts) => {
  	if (err) response.internalError(res, err.sqlMessage)
  	else {
  		if ( accounts.length < 1 ) response.empty(res)
  		else response.success(res, { accounts })
  	}
  })
}
