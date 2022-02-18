'use strict'

const fs = require('fs')
require('dotenv').config()

const getDurationInMilliseconds = (start) => {
   const NS_PER_SEC = 1e9
   const NS_TO_MS = 1e6
   const diff = process.hrtime(start)

   return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const createLog = (req, res, duration) => {

	const { url, method } = req
	const { statusCode, statusMessage } = res
	
	const now = new Date().toLocaleString('id')

	const log = `[${now}] [${statusCode} - ${statusMessage}] ${url} ${method} ${duration.toLocaleString('id')}ms`
	
	fs.appendFile(
		process.env.LOGGER_PATH,
		log + '\n',
		err => {
			if (!err) console.log(log)
		}
	)
}

module.exports = (req, res, next) => {

	const start = process.hrtime()

	res.on('finish', () => {
		createLog(
			req, res, getDurationInMilliseconds(start)
		)		
	})
	
	next()
}
