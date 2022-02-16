'use strict'

const controller = require('../controller')
const auth = require('../middleware/authentication.js')

module.exports = app => {

	app.route('/')
		.get( controller.index  )

	app.route('/login').post( controller.login )

	app.route('/candidates')
		.get( auth, controller.getCandidates )
}
