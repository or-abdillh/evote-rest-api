'use strict'

const { Event, User, Candidate } = require('../database').models
const { success, serverError } = require('../helpers/JSONResponse.js')

module.exports = {

    index(req, res) {
        success('This is example response from our server', res)
    },

    async getDashboard(req, res) {
        // return counts of
        try {
            // candidate,
            const candidates = await Candidate.count({ where: {} })
            // participants,
            const participants = await User.count({ where: { role: 'general' }})
            // usersHasVoted,
            const userHasVoted = await User.count({
                where: {
                    status: true,
                    role: 'general'
                }
            })
            // participations
            const participations = (( 100 / participants ) * userHasVoted).toFixed(1) + '%'
            success({ candidates, participants, userHasVoted, participations }, res)
        } catch(err) { serverError(err, res) }
    },

    async getQuickCount(req, res) {

    }
}