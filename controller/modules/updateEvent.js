'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get form for update event from body
  const eventStartAt = req.body.event_start_at,
        eventFinishAt = req.body.event_finish_at,
        passcode = req.body.passcode,
        eventTitle = req.body.event_title;

  //Create SQL
  const sql = `
	    UPDATE Event SET event_start_at = "${eventStartAt}", 
	    event_finish_at = "${eventFinishAt}", passcode = "${passcode}",
	    event_title = "${eventTitle}"
	 `

	conn.query(sql, (err, rows) => {
		if (err) response.internalError(res, err)
		else {
			if ( rows.affectedRows > 0 ) response.success(res, 'Success to update Event detail')
			else response.empty(res)
		}
	})
  
}
