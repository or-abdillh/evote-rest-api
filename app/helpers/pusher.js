'use strict'

require('dotenv').config({ path: process.cwd() + '/.env' })

const Pusher = require('pusher')

module.exports = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
})