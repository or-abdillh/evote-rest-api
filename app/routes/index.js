'use strict'

// Controllers 
const { 
    homeController, 
    userController, 
    candidateController, 
    eventController,
    loginController } = require('../controller')

module.exports = app => {

    // Main
    app.route('/').get( homeController.index )
    app.route('/login').post( loginController.userLogin )
    app.route('/logout').put( loginController.userLogout )
    
    // Admin 
    app.route('/admin/auth').get( loginController.authenticatedUser )
    app.route('/admin/dashboard').get( homeController.getDashboard )
    app.route('/admin/quick-count').get( homeController.getQuickCount )

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

    // user
    app.route('/user/auth').get( loginController.authenticatedUser )
    app.route('/user/profile/:id').get( userController.show )
    app.route('/user/candidate').get( candidateController.index )
    app.route('/user/event').get( eventController.index )
    app.route('/user/vote/:user_id/:candidate_id').put( userController.voting )
}