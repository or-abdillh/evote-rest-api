'use strict'

// Controllers 
const { homeController, userController } = require('../controller')

module.exports = app => {

    app.route('/').get( homeController.index )

    // Admin 
    app.route('/admin/user')
        .get( userController.index )
}