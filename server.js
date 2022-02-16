'use strict'

const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

app.listen(PORT, err => {
	if (err) throw err
	console.log(`Server running at PORT ${PORT} !!`)
})
