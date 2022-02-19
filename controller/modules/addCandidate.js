'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get form new candidate from body
	const candidateNumber = req.body.candidate_number,
	      chairmanName = req.body.chairman_name,
	      chairmanImg = req.body.chairman_image,
	      viceChairmanName = req.body.vice_chairman_name,
	      viceChairmanImg = req.body.vice_chairman_image	

	//Create SQL
	const sql = `
     INSERT INTO Candidates (candidate_number, chairman_name, chairman_image, vice_chairman_name, vice_chairman_image) 
     VALUES ("${candidateNumber}", "${chairmanName}", "${chairmanImg}", "${viceChairmanName}", "${viceChairmanImg}")
  `      

  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err)
  	else {
  		if ( rows.affectedRows > 0 ) response.success(res, `success to create new candidate for ${chairmanName} - ${viceChairmanName}`)
  		else response.internalError(res, `something wrong when create new candidate for ${chairmanName} - ${viceChairmanName}`)
  	}
  })
}
