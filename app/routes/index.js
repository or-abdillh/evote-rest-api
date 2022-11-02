'use strict'

// Controllers 
const { homeController, userController } = require('../controller')

module.exports = app => {

    app.route('/').get( homeController.index )

    // Admin 
    app.route('/admin/user')
        .get( userController.index )
        .post( userController.create )
        .delete( userController.destroyAll )
    
    app.route('/admin/user/:id')
        .get( userController.show )
        .delete( userController.destroy )
        .put( userController.update )
}