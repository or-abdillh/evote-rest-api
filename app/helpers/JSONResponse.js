'use strict'

const generateBody = (code, message, data = []) => {
    return JSON.stringify({
        status: code >= 200 && code < 300 ? true : false,
        code,
        message,
        results: data
    })
}

module.exports = {

    success(data, res) {
        res.status(200).send(generateBody(200, 'Success', data))
    },

    notFound(data = [], res) {
        res.status(404).send(generateBody(404, 'Not Found', data))
    },

    forbidden(data = [], res) {
        res.status(403).send(generateBody(501, 'Not Allowed Access', data))
    },

    serverError(data = [], res) {
        res.status(501).send(generateBody(501, 'Internal Server Error', data))
    }
}