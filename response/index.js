'use strict'

const createJSON = (code, message, data = []) => {
	return {
		status: true,
		code,
		message,
		response: data,
		createAt: new Date().toLocaleString('id')
	}
}

module.exports =  {

	success(res, data) {
		res.status(200)
		res.json( createJSON(200, 'Success', data) )
		res.end()	
	},

	internalError(res, err) {
		res.status(501).send( createJSON(501, 'Internal server error', err.sqlMessage) )
	},

	forbidden(res, message = false) {
		res.status(403).send( createJSON(403, 'Ilegal access', message) )
	},

	empty(res) {
		res.status(203).send( createJSON(203, 'Empty results') )
	}
}
