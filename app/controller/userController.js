'use strict'

const md5 = require('md5')
const { User, Job } = require('../database').models
const { success, serverError, notFound } = require('../helpers/JSONResponse.js')

module.exports = {

    async index(req, res) {
        try {
            const users = await User.findAll({
                include: {
                    model: Job,
                    attributes: ['name']
                }
            })
            success(users, res)
        } catch(err) { serverError(err, res) }
    },

    async show(req, res) {
        // get user id 
        const { id } = req.params
        try {
            const users = await User.findAll({
                where: { id },
                include: {
                    model: Job,
                    attributes: ['name']
                }
            })
            success(users[0], res)
        } catch(err) { serverError(err, res) }
    },

    async create(req, res) {
        // parse body 
        const { username, password, fullname, job_id, gender  } = req.body
        try {
            await User.create({ username, password: md5(password), fullname, job_id, gender })
            success('Create new user success', res)
        } catch(err) { serverError(err, res) }
        
    },

    async destroy(req, res) {
        // Get id user from request
        const { id } = req.params
        try {
            const deleted = await User.destroy({ where: { id } })
            if ( deleted ) success('Delete user from record success', res)
            else notFound('Cannot find user', res) 
        } catch(err) { serverError(err, res) }
    },

    async destroyAll(req, res) {
        await User.destroy({ truncate: true })
        success('Delete all user records success', res)
    },

    async update(req, res) {
        // get id
        const { id } = req.params
        // get form
        const { username, password, fullname, job_id, gender  } = req.body
        try {
            const updated = await User.update({ username, password: md5(password), job_id, gender }, {
                where: { id }
            })
            if ( updated ) success('Update user record success', res)
            else notFound('User not found', res)
        } catch(err) { serverError(err, res) }
    }
}