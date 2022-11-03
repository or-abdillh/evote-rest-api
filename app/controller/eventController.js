'use strict'

const { Event } = require('../database').models
const { success, notFound, serverError } = require('../helpers/JSONResponse.js')

module.exports = {

    async index(req, res) {
        const events = await Event.findOne()
        success(events, res) 
    },

    async update(req, res) {
        try {
            // get form
            const { title, start, end, passcode } = req.body
            await Event.update({ title, start, end, passcode }, { where: {} })
            success('Success update event detail', res)
        }  catch(err) { serverError(err, res) }
    }
}