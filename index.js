'use strict'

// Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const database = require('./app/database')
const routes = require('./app/routes')

// Initialization
const app = express()
const PORT = process.env.PORT || 3000

// Setup
app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )
app.use( cors() )
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