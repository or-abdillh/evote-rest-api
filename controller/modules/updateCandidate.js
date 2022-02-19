'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get form update candidate from body
  const candidateId = req.body.candidate_id,
        candidateNumber = req.body.candidate_number,
        chairmanName = req.body.chairman_name,
        chairmanImg = req.body.chairman_image,
        viceChairmanName = req.body.vice_chairman_name,
        viceChairmanImg = req.body.vice_chairman_image;

	//Create sql
  const sql = `
     UPDATE Candidates SET chairman_name = "${chairmanName}", chairman_image = "${chairmanImg}",
     vice_chairman_name = "${viceChairmanName}", vice_chairman_image = "${viceChairmanImg}",
     candidate_number = "${candidateNumber}" WHERE candidate_id = "${candidateId}"
  `

  conn.query(sql, (err, rows) => {
  	if (err) response.internalError(res, err)
  	else {
  		if ( rows.affectedRows > 0 ) response.success(res, `success to update candidate ${chairmanName} - ${viceChairmanName}`)
  		else response.notFound(res, { candidateID })
  	}
  })
}
