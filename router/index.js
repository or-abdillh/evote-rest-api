'use strict'

const controller = require('../controller')

module.exports = app => {

	app.route('/')
		.get( controller.index  )

	app.route('/login').post( controller.login )
}
