'use strict'

const { User } = require('../database').models
const { success, serverError } = require('../helpers/JSONResponse.js')

module.exports = {

    async index(req, res) {
        try {
            const users = await User.findAll()
            success(users, res)
        } catch(err) { serverError(err, res) }
    },

    async create(req, res) { },
    async destroy(req, res) {},
    async update(req, res) {}
}