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
		res.status(501)
		res.json( createJSON(501, 'internal server error', err) )
		res.end()
	},

	forbidden(res) {
		res.status(403)
		res.send( createJSON(501, 'Ilegal access') )
		res.end()
	}
}
