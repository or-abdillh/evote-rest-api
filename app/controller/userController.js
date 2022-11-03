'use strict'

const md5 = require('md5')
const { User } = require('../database').models
const { success, serverError, notFound } = require('../helpers/JSONResponse.js')

module.exports = {

    async index(req, res) {
        try {
            const users = await User.findAll()
            success(users, res)
        } catch(err) { serverError(err, res) }
    },

    async show(req, res) {
        // get user id 
        const { id } = req.params
        try {
            const user = await User.findOne({ where: { id } })
            if ( user !== null ) success(user, res)
            else notFound('User not found', res)
        } catch(err) { serverError(err, res) }
    },

    async create(req, res) {
        // parse body 
        const { username, password, fullname, job, gender  } = req.body
        try {
            await User.create({ username, password: md5(password), fullname, job, gender })
            success('Create new user success', res)
        } catch(err) { serverError(err, res) }
    },

    async destroy(req, res) {
        // Get id user from request
        const { id } = req.params
        try {
            const user = await User.findOne({ where: { id } })
            if ( user !== null ) {
                await User.destroy({ where: { id } })
                success('Delete user from record success', res)
            } else notFound('Cannot find user', res) 
        } catch(err) { serverError(err, res) }
    },

    async destroyAll(req, res) {
        await User.destroy({ truncate: true })
        success('Delete all user records success', res)
    },

    async update(req, res) {
        // get id
        const { id } = req.params
        try {
            const user = await User.findOne({ where: { id } })
            if ( user !== null ) {
                // get form
                const { username, password, fullname, job, gender  } = req.body
                await User.update({ username, password: md5(password), job, gender }, {
                    where: { id }
                })
                success('Update user record success', res)
            } else notFound('User not found', res) 
        } catch(err) { serverError(err, res) }
    }
}