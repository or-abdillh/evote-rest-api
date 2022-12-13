'use strict'

const generateBody = (res, code, message, data = []) => {
    res.status(code).send(
        JSON.stringify({
            status: code >= 200 && code < 300 ? true : false,
            code,
            message,
            results: data
        })
    )
}

module.exports = {

    success(data, res) {
        generateBody(res, 200, 'Success', data)
    },

    notFound(data = [], res) {
        generateBody(res, 404, 'Not Found', data)
    },

    forbidden(data = [], res) {
        generateBody(res, 403, 'Not Allowed Access', data)
    },

    badRequest(data = [], res) {
        generateBody(res, 400, 'Bad Request', data)
    },

    serverError(data = [], res) {
        generateBody(res, 501, 'Internal Server Error', data)
    }
}