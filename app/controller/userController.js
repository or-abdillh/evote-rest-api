'use strict'

const fs = require('fs')
const md5 = require('md5')
const readExcel = require('read-excel-file/node')
const exceljs = require('exceljs')
const { User, Event, Candidate } = require('../database').models
const { success, serverError, notFound, badRequest, forbidden } = require('../helpers/JSONResponse.js')

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
                await User.update({ username, fullname, password: md5(password), job, gender }, {
                    where: { id }
                })
                success('Update user record success', res)
            } else notFound('User not found', res) 
        } catch(err) { serverError(err, res) }
    },

    async voting(req, res) {
        // get id at params
        const { user_id, candidate_id } = req.params

        // validate event
        const event = await Event.findOne({
            attributes: ['start', 'end']
        })
        
        // validate is event available
        const now = new Date().getTime()
        if ( now >= new Date(event.start).getTime() && now <= new Date(event.end).getTime() ) {
            try {
                // validate candidate id
                const candidate = await Candidate.findOne({ where: { id: candidate_id } })
                if ( candidate !== null ) {
                    // validate user
                    const user = await User.findOne({ where: { id: user_id } })
                    if ( user !== null ) {
                        if ( user.status ) forbidden('You cant submit vote again', res)
                        else {
                            // submit vote
                            user.candidate_id = candidate_id
                            user.status = true
                            user.timestamp = new Date()
                            await user.save()
                            success('Success submit vote', res)
                        }
                    } else notFound('User not found', res)
                } else notFound('Candidate data not found', res)
            } catch(err) { serverError(err, res) }
        } else forbidden('Event not available for this time, rty again later', res)
    },

    async excelUpload(req, res) {
        // Check file
        if ( !req.files || Object.keys(req.files).length === 0 ) return badRequest('Excel file required', res)
        if ( req.files.excel.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ) return badRequest('Document format not supported', res)

        // get excel file
        const excelFile = req.files.excel
        // read excel
        readExcel(excelFile.tempFilePath)
            .then(rows => {
                // skip header
                rows.shift()
                // mapping
                const users = rows.map(row => {
                    return {
                        username: row[0],
                        password: md5(row[1]),
                        fullname: row[2],
                        job: row[3],
                        gender: row[4]
                    }   
                })
                // insert record
                User.bulkCreate(users)
                    .then(() => success('Success create user from excel', res))
                    .catch(err => serverError(err, res))
            })
            .catch(err => serverError(err, res))
    },

    async excelDownload(req, res) {
        // get all users
        let users = await User.findAll({
            attributes: ['username', 'password', 'fullname', 'job', 'gender']
        })
        users = JSON.parse( JSON.stringify(users) )
        // init workbook
        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('himati-evote-voters')
        // Set columns
        worksheet.columns = [
            { header: 'username', key: 'username', width: 30 },
            { header: 'password', key: 'password', width: 30 },
            { header: 'fullname', key: 'fullname', width: 30 },
            { header: 'job', key: 'job', width: 30 },
            { header: 'gender', key: 'gender', width: 20 }
        ]
        // add rows
        worksheet.addRows(users)
        // write file
        const fileName = `himati-evote-voters-${ new Date().getTime() }.xlsx`
        const filePath = `${ process.cwd() }/public/storage/${ fileName }`
        // write
        workbook.xlsx.writeFile(filePath)
            .then( () => {
                res.download(filePath, () => {
                    // remove file
                    fs.unlink(filePath, () => console.log('remove file') )
                })
            })
            .catch(err => serverError(err, res))
    }
}