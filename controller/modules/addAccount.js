'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get form new Account from body
	const username = req.body.username,
				password = req.body.password,
				fullname = req.body.fullname,
				gender = req.body.gender,
				jobId = req.body.job_id,
				lastModified = new Date().getTime()

	//Create sql
	const sql = `
     INSERT INTO Accounts (fullname, username, password, gender, job_id, last_modified) 
     VALUES ("${fullname}", "${username}", "${password}", "${gender}", "${jobId}", ${lastModified})
  `

  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err.sqlMessage)
  	else response.success(res, `create account success for ${fullname}`)
  })
}
