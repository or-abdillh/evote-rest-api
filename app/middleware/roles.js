'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const jwt = require('jsonwebtoken')
const { badRequest, forbidden } = require('../helpers/JSONResponse.js')

module.exports = {

    hasRole(role) {
        return (req, res, next ) => {
            // get token from headers
            const { token } = req.headers
            // validate
            if ( token === undefined || token === '' ) badRequest('token at headers request is required', res)
            // verify token
            jwt.verify(token, process.env.JWT_SECRET_KEY, 
                (err, decoded) => {
                    if (err) return forbidden('your token not verified', res)
                    else {
                        // validate role
                        if ( decoded.role === role ) next()
                        else forbidden('you not have access for this resource', res)
                    }
                }
            )
        }
    }
}