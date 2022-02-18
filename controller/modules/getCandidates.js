'use strict'

const conn = require('../../connection.js')
const response = require('../../response')

module.exports = (req, res) => {

	// Query to DB
	const sql = 'SELECT * FROM Candidates'

	conn.query(sql, (err, candidates) => {
		if (err) response.internalError(res, err)
		else {
			if (candidates.length > 0) response.success(res, { candidates })
			else response.empty(res)
		}
	})
}
