'use strict'

const conn = require('../../connection.js')
const response = require('../../response')

module.exports = (req, res) => {

	// Query to DB
	const sql = 'SELECT * FROM Candidates'

	conn.query(sql, (err, rows) => {
		if (err) response.internalError(res, err)
		else {
			if (rows.length > 0) response.success(res, { candidates: rows, length: rows.length })
			else response.empty(res)
		}
	})
}
