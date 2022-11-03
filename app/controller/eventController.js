'use strict'

const { Event } = require('../database').models
const { success, notFound, serverError } = require('../helpers/JSONResponse.js')

module.exports = {

    async index(req, res) {
        const events = await Event.findAll()
        success(events, res) 
    },

    async show(req, res) {
        // get event id at params
        const { id } = req.params
        try {
            const event = await Event.findOne({ where: { id } })
            if ( event !== null ) success(event, res)
            else notFound('Event not found', res)
        } catch(err) { serverError(err, res) }
    },

    async create(req, res) {
        // get form
        const { title, start, end, passcode } = req.body
        try {
            await Event.create({
                title, start, end, passcode
            })
            success('Success create new event', res)
        } catch(err) { serverError(err, res) }
    },

    async update(req, res) {
        // get event id at params
        const { id } = req.params
        try {
            const event = await Event.findOne({ where: { id } })
            if ( event !== null ) {
                // get form
                const { title, start, end, passcode } = req.body
                await Event.update({ title, start, end, passcode }, {
                    where: { id }
                })
                success('Success update event detail', res)
            } else notFound('Event not found', res) 
        }  catch(err) { serverError(err, res) }
    }
}