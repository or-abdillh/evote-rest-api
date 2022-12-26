'use strict'

module.exports = date => {
    try {
        return new Date((typeof date === "string" ? new Date(date) : date)
            .toLocaleString("en-US", {
                timeZone: "Asia/Singapore"
            }))
    } catch(err) {
        console.log(err)
    }
}