'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get form update account from body
  const username = req.body.username,
  			key = req.body.key,
        password = req.body.password,
        fullname = req.body.fullname,
        gender = req.body.gender,
        jobId = req.body.job_id,
        lastModified = new Date().getTime()
	
  //Create SQL
  const sql = `
		UPDATE Accounts SET fullname = "${fullname}", 
    username = "${username}", password = "${password}",
    gender = "${gender}", job_id = "${jobId}", last_modified = "${lastModified}" 
    WHERE username = "${key}"
  `

  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err.sqlMesasge)
  	else {
  		if ( rows.affectedRows > 0 ) response.success(res, `success to update account for ${key}`)
  		else response.notFound(res, { key })
  	}
  })  	
}
