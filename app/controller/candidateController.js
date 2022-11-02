'use strict'

const fs = require('fs')
const path = require('path')
const { Candidate } = require('../database').models
const { success, notFound, serverError } = require('../helpers/JSONResponse.js')

const candidateController = {

    uploadImages(files, callback) {
        // paths upload
        const paths = {}

        for ( const file in files ) {
            // Move file
            const image = files[file]
            const format = image.name.split('.')
            const path = `storage/${ file }_${ new Date().getTime() }.${ format[format.length - 1] }`
            const destination = `${ process.cwd() }/public/${ path }`
            
            image.mv(destination, async err => {
                if (err) return serverError(err, res)
            })
            paths[file] = path
        }

        callback(paths)
    },

    deleteImages(files) {
        for ( const file of files ) {
            if ( file !== null ) fs.unlinkSync(`${ process.cwd() }/public/${ file }`)
        }
    },

    async index(req, res) {
        const candidates = await Candidate.findAll()
        success(candidates, res)
    },

    async show(req, res) {
        const { id } = req.params
        const candidate = await Candidate.findOne({ where: { id } })
        success(candidate, res)
    },

    async create(req, res) {
        // get form
        const { chairman_name, vice_chairman_name, candidate_number, vision, mission } = req.body

        // Get files 
        if ( !req.files || Object.keys(req.files).length === 0 ) return notFound('Files image not found', res)
        
        candidateController
            .uploadImages(req.files, async paths => {
                // save to database
                try {
                    await Candidate.create({
                        chairman_name, vice_chairman_name, candidate_number, vision, mission,
                        chairman_image: paths.chairman_image,
                        vice_chairman_image: paths.vice_chairman_image
                    })
                    success('Success create new candidate', res)
                } catch(err) { serverError(err, res) }
            })

    },

    async update(req, res) {
        // get id
        const { id } = req.params
        
        // get form
        const { chairman_name, vice_chairman_name, candidate_number, vision, mission } = req.body
        
        // Check files
        if ( !req.files || Object.keys(req.files).length === 0 ) {
            // Dont re upload image
            const updated = await Candidate.update({ chairman_name, vice_chairman_name, candidate_number, vision, mission }, {
                where: { id }
            })
            if ( updated ) success('Success update candidate data', res)
            else notFound('Candidate data not found', res)
        } else {
            // Reupload file image
            const candidate = await Candidate.findOne({ where: { id } })
            
            // Reupload
            candidateController
                .uploadImages(req.files, async paths => {
                    // save to database
                    try {
                        await Candidate.update({
                            chairman_name, vice_chairman_name, candidate_number, vision, mission,
                            chairman_image: paths.chairman_image,
                            vice_chairman_image: paths.vice_chairman_image
                        }, {
                            where: { id }
                        })
                        success('Success update candidate data', res)
                    } catch(err) { serverError(err, res) }
                })

            // Remove old files
            candidateController
                .deleteImages([ candidate.chairman_image, candidate.vice_chairman_image ])
        }
    },

    async destroy(req, res) {
        // get id
        const { id } = req.params
        // get record
        const candidate = await Candidate.findOne({ where: { id } })
        if ( candidate !== null ) {
            // delete record
            const deleted = await Candidate.destroy({ where: { id } })
            // delete images
            candidateController
                .deleteImages([ candidate.chairman_image, candidate.vice_chairman_image ])
            success('Success remove candidate from record', res)
        } else notFound('Candidate data not found', res)
    },

    async destroyAll(req, res) { 
        // remove all records
        await Candidate.destroy({ where: {} })
        // remove all images
        const directory = process.cwd() + '/public/storage'
        fs.readdir(directory, (err, files) => {
            if (err) return serverError(err, res)
            for ( const file of files ) {
                fs.unlinkSync( path.join(directory, file) )
            }
        })
        success('Remove all candidate data from database', res)
    },
}

module.exports = candidateController