'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const conn = require('./connection.js')
const router = require('./router')

const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

router(app)

app.listen(PORT, err => {
	if (err) throw err
	console.log(`Start time ${new Date().toLocaleString('id')}`)
	console.log(`Server running at PORT ${PORT} !!`)
})
