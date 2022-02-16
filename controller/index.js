'use strict'

const response = require('../response')

module.exports = {

	index(req, res) {
		console.log(req)
		response.success(res, {
			data: 'This is example response from API',
			message: 'API is working !!'
		})
	}
}
