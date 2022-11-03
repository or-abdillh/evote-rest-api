'use strict'

// Controllers 
const { 
    homeController, 
    userController, 
    candidateController, 
    eventController } = require('../controller')

module.exports = app => {

    app.route('/').get( homeController.index )

    // Admin 
    app.route('/admin/user')
        .get( userController.index )
        .post( userController.create )
        .delete( userController.destroyAll )
    
    app.route('/admin/user/excel')
        .post( userController.excelUpload )
        .get( userController.excelDownload )

    app.route('/admin/user/:id')
        .get( userController.show )
        .delete( userController.destroy )
        .put( userController.update )

    app.route('/admin/candidate')
        .get( candidateController.index )
        .post( candidateController.create )
        .delete( candidateController.destroyAll )

    app.route('/admin/candidate/:id')
        .get( candidateController.show )
        .put( candidateController.update )
        .delete( candidateController.destroy )

    app.route('/admin/event')
        .get( eventController.index )
        .put( eventController.update )
}