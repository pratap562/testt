const mongoose = require('mongoose')

let connection = mongoose.connect(`${process.env.mongoUrl}/mock5?retryWrites=true`)

module.exports = connection
