const mongoose = require('mongoose')

const FlightModel = mongoose.model('flight', mongoose.Schema({
    airline: { type: String, required: true },
    flightNo: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true }
}))

module.exports = FlightModel
