'use strict'

const controller = require('../controller')

module.exports = app => {

	app.route('/').get( controller.index  )

	app.route('/login').post( controller.system.login )

	app.route('/auth').get( controller.system.auth )

	app.route('/accounts/profile').get( controller.accounts.getter.profile )

	app.route('/accounts/vote/:candidate').post( controller.accounts.setter.voting )

	app.route('/event')
		.get( controller.event.getter.simple )

	app.route('/candidates')
		.get( controller.candidates.getter.all )
}
