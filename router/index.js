'use strict'

const controller = require('../controller')
const auth = require('../middleware/authentication.js')

module.exports = app => {

	app.route('/')
		.get( controller.index  )

	app.route('/login').post( controller.accounts.login )

	app.route('/auth').get( controller.accounts.auth )

	app.route('/candidates')
		.get( auth, controller.candidates.getter )
}
