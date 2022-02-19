'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//get candidate_id from body
  const candidateID = req.body.candidate_id;

  //Create sql 
  const sql = `DELETE FROM Candidates WHERE candidate_id = '${candidateID}'`

  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err)
  	else {
  		if ( rows.affectedRows > 0 ) response.success(res, `Sucess to remove candidate from list by id ${candidateID}`)
  		else response.notFound(res, { candidateID })
  	}
  })
}
