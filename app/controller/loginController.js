'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { User } = require('../database').models
const { success, badRequest, serverError, notFound } = require('../helpers/JSONResponse.js')

module.exports = {

    async userLogin(req, res) {
        // get form
        const { username, password } = req.body
        // validation
        if ( username === undefined || password === undefined ) return badRequest('username or password required', res)
        try {
            const user = await User.findOne({
                where: {
                    username,
                    password: md5(password)
                }
            })
            // not authenticated
            if ( user === null ) return notFound('username or password is wrong', res)
            // authenticated
            jwt.sign({ username, password }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }, 
                async (err, token) => {
                    if (err) return serverError(err, res)
                    user.token = token
                    await user.save()
                    success({ token, role: user.role }, res)
                }
            )
        } catch(err) { serverError(err, res) }
    },

    async userLogout(req, res) {
        // get user id from body
        const { id } = req.body
        //validate
        if ( id === undefined || id === '' ) return badRequest('user id required', res)
        try {
            const user = await User.findOne({ where: { id } })
            if ( user === null ) return notFound('user data not found', res)
            // remove token
            user.token = null
            await user.save()
            success('user has logout', res)
        } catch(err) { serverError(err, res) }
    }
}