'use strict'

const controller = require('../controller')

module.exports = app => {

	app.route('/').get( controller.index  )

	app.route('/login').post( controller.system.login )

	app.route('/auth').get( controller.system.auth )

	app.route('/accounts/:username').get( controller.accounts.getter.profile )

	app.route('/candidates')
		.get( controller.candidates.getter.all )
}
