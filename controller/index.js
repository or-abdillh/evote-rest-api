'use strict'

const response = require('../response')

module.exports = {

	index(req, res) {
		response.success(res, 'This is example response from your server')
	},

	accounts: {
		login: require('./modules/login.js'),
		auth: require('./modules/auth.js')
	},

	candidates: {
		getter: require('./modules/getCandidates.js')
	}
}
