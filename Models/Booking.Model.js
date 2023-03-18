
const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const BookingModel = mongoose.model('booking', mongoose.Schema({
    user: { type: ObjectId, required: true },
    flight: { type: ObjectId, required: true }
}))

module.exports = BookingModel
