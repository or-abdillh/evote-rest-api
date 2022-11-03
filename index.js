'use strict'

// Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const database = require('./app/database')
const routes = require('./app/routes')

// Initialization
const app = express()
const PORT = process.env.PORT || 3000

// Setup
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( fileUpload( { useTempFiles: true, tempFileDir: process.cwd() + '/public/tmp/' } ) )
app.use( cors() )
app.use( express.static( process.cwd() + '/public' ) )
routes( app )

// Database connection
const dbPrepareConnection = async () => {
    try {
        console.log('Prepare connection ...')
        await database.authenticate()
        console.log('Database connected !!')
    } catch( err ) {
        console.log('Failed to connect database !!')
        console.log(err)
        process.exit(1)
    }
}

// Main method
const Init = () => {

    dbPrepareConnection()

    app.listen( PORT, err => {
        if (err) throw err
        console.log('Server running at PORT ' + PORT)
    })
}

// App
Init()