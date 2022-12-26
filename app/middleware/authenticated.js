'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { User } = require('../database').models
const { badRequest, forbidden, notFound, serverError } = require('../helpers/JSONResponse.js')

module.exports = async (req, res, next) => {
    const { token } = req.headers || ''
    // validate
    if ( token === undefined || token === '' ) return badRequest('token at headers request is required', res)
    // verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({
            where: {
                username: decoded.username,
                password: md5( decoded.password )
            }
        })
        if ( user === null ) return notFound('user not found with token from headers', res)
        next()
    } catch(err) { 
        return serverError(err, res)
    }
}