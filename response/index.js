'use strict'

const createJSON = (code, message, data) => {
	return {
		status: true,
		code,
		message,
		response: data,
		createAt: new Date().toLocaleString('id')
	}
}

module.exports =  {

	success(res, { data, message }) {
		res.status(200)
		res.json( createJSON(200, message, data) )
		res.end()	
	}
}
