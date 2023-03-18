
// const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const BookingModel = mongoose.model('booking', mongoose.Schema({
    user: { required: true },
    flight: { required: true }
}))

module.exports = BookingModel
