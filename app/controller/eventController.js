'use strict'

const { Event, User } = require('../database').models
const { success, notFound, serverError } = require('../helpers/JSONResponse.js')
const convertTimezone = require('../helpers/convertTimezone')

module.exports = {

    async index(req, res) {
        // return detail event and counts of user has voted
        try {
            // event
            const event = await Event.findOne()
            // user has voted
            const userHasVoted = await User.count({
                where: {
                    status: true,
                    role: 'general'
                }
            })
            event.dataValues.hasVoted = userHasVoted
            success(event, res)
        } catch(err) { serverError(err, res) }
    },

    async update(req, res) {
        try {
            // get form
            let { title, start, end, passcode } = req.body
            // Query
            await Event.update({ title, start, end, passcode }, { where: {} })
            success('Success update event detail', res)
        }  catch(err) { serverError(err, res) }
    }
}