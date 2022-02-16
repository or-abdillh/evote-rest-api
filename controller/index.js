'use strict'

const response = require('../response')

module.exports = {

	index(req, res) {
		response.success(res, 'This is example response from your server')
	},

	login: require('./modules/login.js')
}
