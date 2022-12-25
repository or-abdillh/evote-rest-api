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
        // return array of candidates contain detail and quick count
        try {
            // candidates
            const candidates = await Candidate.findAll({ 
                attributes: ['id', 'chairman_name', 'vice_chairman_name', 'candidate_number'],
                order: [
                    ['candidate_number', 'ASC']
                ]
            })
            const users = await User.findAll({
                attributes: ['candidate_id'],
                where: { role: 'general' }
            })

            // loop candidates
            const counts = candidates.map(candidate => {
                const data = candidate.dataValues
                // vote
                const vote = users.filter(user => user.dataValues.candidate_id === data.id).length
                return {
                    candidate: `${ data.chairman_name } - ${ data.vice_chairman_name }`,
                    number: data.candidate_number,
                    decimal: ( 100 / users.length ) * vote,
                    percent: ( 100 / users.length ) * vote === 0 ? '0%' : (( 100 / users.length ) * vote).toFixed(1) + '%', 
                    vote,
                }
            })
            success(counts, res)
        } catch(err) { serverError(err, res) }
    }
}