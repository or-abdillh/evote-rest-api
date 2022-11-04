'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { User } = require('../database').models
const { badRequest, forbidden, notFound } = require('../helpers/JSONResponse.js')

module.exports = (req, res, next) => {
    // get token from headers
    const { token } = req.headers
    // validate
    if ( token === undefined || token === '' ) badRequest('token at headers request is required', res)
    // verify token
    jwt.verify(token, process.env.JWT_SECRET_KEY, 
        async (err, decoded) => {
            if ( err ) return forbidden('your token not verified', res)
            // validate user
            const user = await User.findOne({
                where: {
                    username: decoded.username,
                    password: md5( decoded.password )
                }
            })
            if ( user === null ) return notFound('user not found with token from headers', res)
            next()
        }
    )
}