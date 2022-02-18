'use strict'

const response = require('../response')

module.exports = {

	index(req, res) {
		response.success(res, 'This is example response from your server')
	},

	system: {
		login: require('./modules/login.js'),
		auth: require('./modules/auth.js')
	},

	accounts: {
		getter: {
			profile: require('./modules/getProfile.js'),
			all: require('./modules/getAccounts.js'),
		},
		setter: {
			voting: require('./modules/voting.js'),
			add: require('./modules/addAccount.js'),
			remove: require('./modules/removeAccount.js'), 
		}
	},

	candidates: {
		getter: {
			all: require('./modules/getCandidates.js')
		}
	},

	event: {
		getter: {
			simple: require('./modules/getEvent.js')
		}
	}
}
