'use strict'

const response = require('../../response')
const conn = require('../../connection.js')

module.exports = ( req, res ) => {

	//Get username from body
	const username = req.body.username
	const sql = `DELETE FROM Accounts WHERE username = "${username}"`
	
	conn.query(sql, (err, rows) => {
		if (err) response.internalError(res, err)
		else {
			if (rows.affectedRows > 0) response.success(res, `Success to remove ${username} from list accounts`)
			else response.notFound(res, { username })
		}
	})	
}
