'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const conn = require('./connection.js')
const router = require('./router')
const logger = require('./middleware/logger.js')
const auth = require('./middleware/authentication.js')

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use(logger)

//Use auth middleware for specific path
const path = [
	'/admin/accounts',
	'/admin/candidates',
	'/admin/event', 
	'/accounts', 
	'/candidates', 
	'/event'
]
app.use(path, auth)

router(app)

app.listen(PORT, err => {
	if (err) throw err
	console.log(`Start time ${new Date().toLocaleString('id')}`)
	console.log(`Server running at PORT ${PORT} !!`)
})
