'use strict'

const { success } = require('../helpers/JSONResponse.js')

module.exports = {

    index(req, res) {
        success('This is example response from our server', res)
    }
}