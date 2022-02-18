'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get event information and count of accounts has a voted
	const sql = 'SELECT * FROM Event ; SELECT COUNT(username) FROM Accounts WHERE status_vote = "1"';	

	conn.query(sql, (err, rows) => {
		if (err) response.internalError(res, err)
		else {
			const event = rows[0][0]
			event.count = rows[1][0]['COUNT(username)']
			response.success(res, { event })
		}
	})
}
